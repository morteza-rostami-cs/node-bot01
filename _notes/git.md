<!--

# push to github:
================

git config --global user.name "Your Name"
git config --global user.email "your-email@github.com"

git config --global --list

#update locally:

git config user.name "Your Name"
git config user.email "your-email@github.com"

git config --local --list

git commit --amend --reset-author

$ git remote -v

ssh-keygen -t ed25519 -C "morteza.rostami.cs@gmail.com" -f ~/.ssh/github_morteza_cs

Nomad@DESKTOP-IIQIOL4 MINGW64 ~
$ eval "$(ssh-agent -s)"
Agent pid 449

Nomad@DESKTOP-IIQIOL4 MINGW64 ~
$ ssh-add ~/.ssh/github_morteza_cs
Identity added: /c/Users/Nomad/.ssh/github_morteza_cs (morteza.rostami.cs@gmail.com)

# add agent to .bash_profile ->in windows gitbash

# Add the SSH key to the agent
ssh-add ~/.ssh/windows-nomad &> /dev/null

# add ssh key to agent for Github morteza.rostami.cs
ssh-add ~/.ssh/github_morteza_cs &> /dev/null

# test
ssh -T git@github.com

$ git remote add origin git@github.com:morteza-rostami-cs/rpgGame01.git

# change the ssh key used for the new github:

nano ~/.ssh/config

Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_new   # <--- your new key
  IdentitiesOnly yes

Nomad@DESKTOP-IIQIOL4 MINGW64 /d/workspace/NODE/node01 (main)
$ git add .

Nomad@DESKTOP-IIQIOL4 MINGW64 /d/workspace/NODE/node01 (main)
$ git commit -m "init 2"
[main 65932d8] init 2
 1 file changed, 9 insertions(+)

Nomad@DESKTOP-IIQIOL4 MINGW64 /d/workspace/NODE/node01 (main)
$ git push -u origin main
-->
