---
title: 个人图床搭建
avatar: 'https://wx1.sinaimg.cn/large/006bYVyvgy1ftand2qurdj303c03cdfv.jpg'
categories: tech
comments: false
date: 2020-02-26 13:04:37
author:
authorLink:
authorAbout:
authorDesc:
tags:
    - linux
keywords:
description: 基于Chevereto的图床搭建
photos:
---
(由于Chevereto-Free尚不支持php3.0，此篇文章未完成)
### 1. 环境说明

    Linux: CentOS 7(CentOS Linux release 7.7.1908)
    Nginx: 1.16.1
    Mysql: 8.0.19
    PHP: 7.3.13

    当然，也可以安装整合包，安装lnmp的全部内容

### 2.环境配置
#### Linux
1. 安装Linux的过程不做赘述

#### Nginx
1. 在联网环境下，使用`yum`命令安装Nginx的依赖环境
```shell
    yum -y install make zlib zlib-devel gcc-c++ libtool openssl openssl-devel
```

2. 将Nginx的安装包上传到服务器任意目录(此处为`/opt/myopt`下)，解压并重命名(按`tab`文件名自动补全)
```shell
    tar -zxvf nginx-1.16.1.tar.gz
    mv nginx-1.16.1 nginx
```

3. 进入解压后的目录，执行`./configure`
```shell
    cd nginx
    ./configure
```

4. 编译并安装Nginx
```shell
    make && make install
```

5. 访问ip，测试是否访问成功；若访问失败，请跳到第6步

6. 首先检查网络连接。
   若无问题，则可能是系统防火墙的80端口未开启；
   若是云服务器，去安全组配置中配置允许访问80端口。

7. 设置开机自启
```shell
    cd /lib/systemd/system
    vim nginx.service
```
```nginx.service
    [Unit]
    Description=nginx 
    After=network.target 
    
    [Service] 
    Type=forking 
    ExecStart=/usr/local/nginx/sbin/nginx
    ExecReload=/usr/local/nginx/sbin/nginx reload
    ExecStop=/usr/local/nginx/sbin/nginx quit
    PrivateTmp=true 
    
    [Install] 
    WantedBy=multi-user.target
```
```shell
    systemctl enable nginx.service
```

#### Mysql
1. 上传安装包，解压；
   重名解压后的文件；
   将文件移动到`/usr/local`目录下
```shell
    tar -xvf mysql-8.0.19-linux-glibc2.12-x86_64.tar.xz
    mv mysql-8.0.19-linux-glibc2.12-x86_64.tar.xz mysql8
    mv mysql8 /usr/local
```

2. 进入`/usr/local/mysql8`,创建数据存放的目录
```shell
    cd /usr/local/mysql8
    mkdir data
```

3. 创建用户及用户组
```shell
    //添加名为mysql的用户组
    groupadd mysql
    //创建名为mysql的用户并将其添加到mysql的用户组中
    useradd -g mysql mysql
```

4. 为`mysql8`文件及其子文件的拥有者改为`mysql`
```shell
    chown -R mysql.mysql /usr/local/mysql8
```

5. 进入`/usr/local/mysql8`,并执行初始化命令，并记住密码(如图)
```shell
    ./mysqld --initialize --user=mysql  --lower_case_table_names=1 --datadir=/usr/local/mysql8/data --basedir=/usr/local/mysql8
```
{% asset_img mysql-passwd.png mysql初始化 %}

6. 修改/etc/my.cnf文件
```shell
    vim /etc/my.cnf
```
```my.cnf
    [mysqld]
    datadir=/usr/local/mysql/data
    port = 3306
    sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES
    symbolic-links=0
    max_connections=400
    innodb_file_per_table=1
    #表名大小写不明感，敏感为
    lower_case_table_names=1
```

7. 添加软连接
```shell
    ln -s /usr/local/mysql8/support-files/mysql.server /etc/init.d/mysql 
    ln -s /usr/local/mysql8/bin/mysql /usr/bin/mysql
    service mysql restart
```

8. 使用初始密码登录mysql，并修改密码
```shell
    //注意：此步输入密码是不会显示
    mysql -u root -p
    //mysql8的password函数失效，因此使用以下命令
    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'yourpassword';
```

9. 开启远程连接
```shell
    use mysql;
    update user set user.Host='%' where user.User='root';
    flush privileges;
```

10. 设置开机自启
```shell
    cp /usr/local/mysql8/support-files/mysql.server /etc/init.d/mysqld
    //赋予可执行权限
    chmod +x /etc/init.d/mysqld
    //先停止服务
    systemctl stop mysqld
    //设置开机自启
    systemctl enable mysqld
    //再次开启
    systemctl start mysqld
```

#### PHP


yum -y install libxml2 libxml2-devel openssl openssl-devel bzip2 bzip2-devel libcurl libcurl-devel libjpeg libjpeg-devel libpng libpng-devel freetype freetype-devel gmp gmp-devel libmcrypt libmcrypt-devel readline readline-devel libxslt libxslt-devel

./configure --prefix=/usr/local/php --with-config-file-path=/etc --enable-fpm --with-fpm-user=www --with-fpm-group=www --enable-inline-optimization --disable-debug --disable-rpath --enable-shared --enable-soap --with-libxml-dir --with-xmlrpc --with-openssl --with-mhash --with-pcre-regex --with-sqlite3 --with-zlib --enable-bcmath --with-iconv --with-bz2 --enable-calendar --with-curl --with-cdb --enable-dom --enable-exif --enable-fileinfo --enable-filter --with-pcre-dir --enable-ftp --with-gd --with-openssl-dir --with-jpeg-dir --with-png-dir --with-zlib-dir --with-freetype-dir  --enable-gd-jis-conv --with-gettext --with-gmp --with-mhash --enable-json --enable-mbstring --enable-mbregex --enable-mbregex-backtrack --with-onig --enable-pdo --with-mysqli=mysqlnd --with-pdo-mysql=mysqlnd --with-zlib-dir --with-pdo-sqlite --with-readline --enable-session --enable-shmop --enable-simplexml --enable-sockets --enable-sysvmsg --enable-sysvsem --enable-sysvshm --enable-wddx --with-libxml-dir --with-xsl --enable-zip --enable-mysqlnd-compression-support --with-pear --enable-opcache --disable-fileinfo

wget  https://nih.at/libzip/libzip-1.2.0.tar.gz

echo '/usr/local/lib64 
/usr/local/lib
/usr/lib
/usr/lib64'>>/etc/ld.so.conf