## What is Git?

Git is a form of version control software written by the creator of Linux, Linux Torvalds. It is used
to create repositories of code for engineers to contribute to. It offers a solution to the problem of
collaboration in software engineering. 

The basic workflow of the developer using Git is as follows: 
1. Write some code for a project.
2. Decide which code is suitable for the project-wide repository.
3. Store the suitable code in the repository.
4. Repeat.

This is a simplified set of actions, but they are the most common and important ones.


## Installation

In order to get started with Git, one must first install it. 

### Linux Ubuntu

```
sudo apt install git
```


### Mac OS

If you haven't already, install homebrew for Mac with the following command.

```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Then use homebrew to intall Git.
```
brew install git
```

## Post-Installation

Run the following command in your terminal to confirm your installation.

```
git --version
```

If the terminal responds with `git version x.x.x`, then you have succeeded!

## Git Setup

Git will stamp your identity on every contribution, or `commit` in Git lingo. Give Git your name
and email by setting the name and email variables with the following commands.

```
git config --global user.name "Sir Lemmiwinks"
git config --global user.email "lemmiwinks@gmail.com"
```

## Conclusion

Now that Git is installed and set up, learn the commands to execute the most common actions in the next tutorial.

