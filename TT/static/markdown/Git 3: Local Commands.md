
<div style="height: 10em;"></div>

When working on substantial projects, especially with others, Git becomes an indispensable tool.
It takes some practice and research to grow into a proficient user. These are some of the most common
commands that I use everyday when working on different features in a project.

# Git Branch
Git stores its history in a graph structure. This may be intimidating for Git users, but it simply means
that the commits, snapshots of the project, reference earlier commits. Branches enable an easy way to 
keep a reference at a place in the commit graph for isolating a piece of work, like a feature or a bug fix.
Literally, a branch is just a named reference to a commit. When a branch is created, the history graph splits
off, just like a branch does in a tree. Projects often have many branches that are concurrently being worked on.

This command creates a branch. 

```
git branch <branch name>
```


<div style="height: 10em;"></div>

# Git Log
This command can be used to visualize the commit graph of a repository. It shows where the HEAD pointer points, as 
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

# Insert Image of terminal using `git graph`

<div style="height: 10em;"></div>

# Git Checkout 
In the commit graph, there is an important pointer called the HEAD pointer. If you've run `git graph`, you would certainly see it.
The HEAD pointer points to the commit, or branch, in the graph where the working directory is extracted from. This command is used to
move the HEAD pointer, which will change the contents of the working directory to that of the commit snapshot being pointed to.

```
git checkout <commit hash or branch name>
```

<div style="height: 10em;"></div>

# Git Stash
Sometimes, 

```
git stash [pop]
```

<div style="height: 10em;"></div>

## Conclusion

