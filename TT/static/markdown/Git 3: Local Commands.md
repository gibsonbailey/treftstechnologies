When working on substantial projects, especially with others, Git realizes its potential as an indispensable tool.
It takes some practice and research to grow into a proficient user. These are some of the most common
commands that I use everyday when working on different features in a project.

<div style="height: 6em;"></div>

# Git Branch
Git stores its history in a graph structure. This may sound intimidating for new Git users, but it simply 
means that the commits, snapshots of the project, reference earlier commits. Branches enable an easy way to 
keep a reference at a place in the commit graph for isolating a piece of work, like a feature or a bug fix.
Literally, a branch is just a named reference to a commit, like a pointer. When a branch is created, the history 
graph diverges, just like a branch does in a tree. Projects often have many branches that are concurrently 
being worked on.

This command creates a branch. 

```
git branch <branch name>
```

</br>
</br>
</br>
</br>
</br>
</br>

<img class="article-image" src="/static/article_images/Git History.png">


<div style="height: 10em;"></div>

# Git Log
This command can be used to visualize the commit graph of a repository. It shows where the `HEAD` pointer points, as 
well as shows the branch pointers point. It connects the commit nodes together to make them point to the previous commit.
It gives a telling view into the inner workings of Git.

In order for `git log` to display the commit graph, it must be modified. This can be done by configuring Git with an alias,
i.e. a shortcut.

The command, in its long form, goes as follows.
```
git log --graph --abbrev-commit --decorate --format=format:'%C(bold yellow)%h%C(reset) - %C(green)(%ar)%C(reset)%C(bold white) %s%C(reset) %C(dim     white)- %an%C(reset)%C(auto)%d%C(reset)' --all
```

I've personalized this command with my color preferences, and they can easily be changed.

We can configure a Git alias with the following command.
```
git config --global alias.graph "log --graph --abbrev-commit --decorate --format=format:'%C(bold yellow)%h%C(reset) - %C(green)(%ar)%C(reset)%C(bold white) %s%C(reset) %C(dim     white)- %an%C(reset)%C(auto)%d%C(reset)' --all"
```

Now the command can be run with the new alias.
```
git graph
```

</br>
</br>
</br>
</br>
</br>
</br>
</br>
</br>

<img class="article-image" src="/static/article_images/git graph.png">


<div style="height: 10em;"></div>

# Git Checkout 
In the commit graph, there is an important pointer called the HEAD pointer. If you run `git graph`, you can certainly see it.
The HEAD pointer points to the commit, or branch, in the graph where the working directory is extracted from. This command is used to
move the HEAD pointer, which will change the contents of the working directory to that of the commit snapshot being pointed to.

```
git checkout <commit hash or branch name>
```

<div style="height: 10em;"></div>

# Git Stash
Sometimes, you have changes in the working directory, that you temporarily would like to store. For example, if you were working on a
branch but weren't ready to commit the changes, and you needed to immediately checkout another branch and make a change, you could:

1. Stash your changes with `git stash`, giving you a clean working directory and index. 
2. Checkout the other branch to make a change and commit it. 
3. Then return back to the original branch (`git checkout`) and pop the stashed changes with `git stash pop`. 

```
git stash [pop]
```
</br>
</br>
</br>
</br>
</br>
</br>
</br>
</br>

<img class="article-image" src="/static/article_images/git stash.png">

<div style="height: 10em;"></div>

## Conclusion
As a developer takes on larger projects, Git can consume a large portion of the developer's time. Getting to know the commands
listed above will keep you on track throughout the day, and keep you from struggling with every new change that needs to be crafted.
Please leave a comment below to let me know how this article series could be better!
