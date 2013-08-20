# grunt-init-om-website

> Create a website scaffold with [grunt-init][].

[grunt-init]: http://gruntjs.com/project-scaffolding

## Installation
If you haven't already done so, install [grunt-init][].

Once grunt-init is installed, place this template in your `~/.grunt-init/` directory. It's recommended that you use git to clone this template into that directory, as follows:

```bash
git clone git@github.com:ogilvyatlanta/grunt-init-om-website.git ~/.grunt-init/om-website
```

## Usage

At the command-line, cd into an empty directory, run this command and follow the prompts.

```bash
grunt-init om-website
# install dependencies
bundle install && npm install && bower install
```

_Note that this template will generate files in the current directory, so be sure to change to a new directory first if you don't want to overwrite existing files._


## Usage after install

To run a server:

```bash
# default
grunt server
# run server using dist files
grunt server:dist
```

To build the project:

```bash
# tasks that <grunt build> runs
# clean:dist
# compass
# requirejs
# imagemin (coming soon)
# htmlmin
# cssmin
# uglify
# copy
grunt build
```

To test the project: (coming soon)

```
grunt test
```
