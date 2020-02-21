---
title: Linux修改root密码(CentOS7适用)
date: 2020-02-21 20:09:09
tags:
---
<!-- more -->

### 一、思路：
	1.进入救援模式，root用户进入此模式不需要密码
	2.通过修改密码来登入系统
### 二、实践：

1. 在以下界面时，按 `e` 进入内核编辑

{% asset_img enterCoreEdit.png [This is an example image] %}

2.进入后，按方向键，找到UTF-8字样；在...UTF-8后加一个空格，再插入`rd.break`，按 `ctrl + x` 执行

{% asset_img 2.png [This is an example image] %}

3.若系统是以中文语言安装的，请先输入`LANG=en`避免乱码
4.依次输入以下指令

```shell
mount -o remount,rw /sysroot
chroot /sysroot
passwd root
touch /.autorelabel
exit
reboot
```

Tips:
	1.在输入密码时，密码不会显示
	2.输入密码时，不要使用小键盘，不要使用小键盘，不要使用小键盘(重要的事说三遍)

{% asset_img shell.png [This is an example image] %}

5.等待重启，输入新的密码