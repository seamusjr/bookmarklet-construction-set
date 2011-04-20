require "rake"
require "fileutils"
require "stringio"
require "json"
require "sass"

include FileUtils

root   = File.dirname(__FILE__)
config = ENV["CONFIG"] || "development"

task :bundle  => [:convert_templates, :convert_css]
task :default => [:bundle]

desc "Converts HTML templates into JS builders."
task :convert_templates do
  cd root do
    mkdir_p "generated"

    File.open("generated/templates.js", "w+") do |out|
      out << "var Templates = {\n"

      sep = ""
      Dir["templates/*.html.jst"].each do |template|
        name = File.basename(template, '.html.jst')
        out << "  " << sep << name << ": " << convert_template(template)
        sep = ","
      end

      out << "};\n"
    end
  end
end

desc "Converts Sass template into a CSS builder."
task :convert_css do
  cd "#{root}" do
    mkdir_p "generated"

    File.open("generated/styles.js", "w+") do |out|
      body = Sass::Engine.new(File.read("css/app.scss"),
                              :style => :compressed,
                              :syntax => :scss).render
      out << "var Styles = " << body.to_json << ";\n"
    end
  end
end

desc "Builds the distribution."
task :bundle do
  cd root do
    mkdir_p "dist/#{config}"

    File.open("dist/#{config}/app.js", "w+") do |out|
      out << "(function() {\n"

      Dir["deps/jquery.js",
          "configs/#{config}.js",
          "generated/templates.js",
          "generated/styles.js",
          "src/app.js"
          ].each do |src|
        out << File.read(src) << "\n"
      end

      out << "}());\n"
    end
  end
end

def convert_template(template)
  template_name = File.basename(template, '.html.jst')

  buf  = StringIO.new
  buf << "function(data) {\n"
  buf << "    var out = [];\n"

  File.readlines(template).each do |line|
    line.split(/(\<%.*?%\>)/).each do |segment|
      next if segment.empty?
      
      if segment[0..2] == '<%='
        expr = segment.match(/\<%=(.*?)%\>/).captures.first.strip
        buf << "    out.push(#{expr});\n"
      elsif segment[0..1] == '<%'
        stmt = segment.match(/\<%(.*?)%\>/).captures.first.strip
        buf << "    #{stmt}\n"
      else
        segment = segment.gsub("'", "\\'").gsub("\n", "\\n")
        buf << "    out.push('#{segment}');\n"
      end
    end
  end

  buf << "    return out.join('');\n"
  buf << "  }\n\n"

  buf.string
end
