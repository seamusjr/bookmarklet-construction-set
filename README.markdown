# The TL;DR

- gem install json
- gem install haml
- CONFIG=development rake

Now you have a shiny new bookmarklet in dist/development/app.js.

# The Skinny

This project assembles a number of small but useful pieces together into a single file which can be script-tag
loaded as a bookmarklet. The anatomy of a project looks like this:

- `src`: Your application JavaScript lives here. Add any files you want and include them in the `Rakefile` :bundle task.
- `deps`: Any 3rd party dependencies live here. By default this is jQuery. Add any files you want and include them in the `Rakefile` :bundle task.
- `configs`: Kind of like `src` but will be included based on the `CONFIG` environment variable. This is mainly for settings that change between a "development" or "production" environment. But you can use it any way you want.
- `templates`: HTML templates go here. These will get "compiled" into functions that you can call from your app. E.g. A file named `example.html.jst` produces the function `Templates.example({})` which takes a data hash and returns an HTML string. Within a template you can use `<% %>` to inline JavaScript code, or `<%= %>` to output the value of a JavaScript expression. If you've used JSP or ERB before, it's just like that.
- `css`: The `app.scss` file goes here. This will be rendered to CSS as a string named `Styles`. The default `app.js` injects it into the document head. Add any files you want and include them in the `Rakefile` :convert_css task.

# Have fun!

***
