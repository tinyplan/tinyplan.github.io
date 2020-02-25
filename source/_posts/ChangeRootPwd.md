---
title: Linux修改root密码(CentOS7适用)
date: 2020-02-21 21:22:14
keywords: Linux
categories: tech
tags: 
	- linux
description: 自己踩过的坑
photos: https://cdn.jsdelivr.net/gh/tinyplan/cdn@v1.8/img/startdash/sakura.md.png
---

<!-- more -->

### 一、思路：
	1.进入救援模式，root用户进入此模式不需要密码
	2.通过修改密码来登入系统
### 二、实践：

1. 在以下界面时，按 `e` 进入内核编辑

{% asset_img enterCoreEdit.png 进入内核编辑 %}

2. 进入后，按方向键，找到UTF-8字样；在...UTF-8后加一个空格，再插入`rd.break`，按 `ctrl + x` 执行

{% asset_img 2.png 内核编辑 %}

3. 若系统是以中文语言安装的，请先输入`LANG=en`避免乱码
4. 依次输入以下指令


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

{% asset_img shell.png shell命令输入结果演示 %}

5. 等待重启，输入新的密码
