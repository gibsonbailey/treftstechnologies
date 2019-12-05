This article series is written to get you up to speed with the Git software. After finishing the series, 
you'll feel confident using Git to build software of your own.

</br>
</br>
</br>

## What actually is Git?

Git is a form of version control software written by the creator of Linux, Linus Torvalds. It is used
to create and manage repositories of code for engineers to contribute to. Git was built to be an efficient 
tool for collaboration. With the power of Git comes a learning curve that is felt by many engineers. This
series of articles will prepare you with an understanding of the most common commands used daily by 
developers.


The basic workflow of the developer using Git goes as follows: 
1. Write some code for a project.
2. Decide which code is suitable for the project-wide repository.
3. Store the suitable code in the repository.
4. Repeat.

This is a simplified set of actions, but they are the most common and important ones.

</br>
</br>
</br>

## Installation

In order to get started with Git, one must first install it. Use the command fit for your machine to install it.

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

</br>
</br>
</br>

## Post-Installation

Run the following command in your terminal to confirm your installation.

```
git --version
```

If the terminal responds with `git version x.x.x`, then you have succeeded!

</br>
</br>
</br>

## Git Setup

Git will stamp your identity on every contribution, or `commit` in Git lingo. Give Git your name
and email by setting the name and email variables with the following commands.

```
git config --global user.name "Sir Lemmiwinks"
git config --global user.email "lemmiwinks@gmail.com"
```

</br>
</br>
</br>

## Conclusion

Now that Git is installed and set up, learn the commands to execute the most common actions in the next tutorial.

