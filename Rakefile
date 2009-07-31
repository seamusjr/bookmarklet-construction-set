require "rake"
require "fileutils"
require "stringio"
require "packr"

include FileUtils

root   = File.dirname(__FILE__)
config = ENV["CONFIG"] || "development"

task :bundle  => [:convert_templates]
task :pack    => [:bundle]
task :default => [:bundle]

desc "Converts HTML templates into JS builders."
task :convert_templates do
  cd root do
    mkdir_p "generated"
    
    File.open("generated/templates.js", "w+") do |out|
      out << "var templates = {};\n\n"
      
      Dir["templates/*.html.jst"].each do |template|
        out << convert_template(template)
      end
    end
  end
end

desc "Builds the distribution."
task :bundle do
  cd root do
    mkdir_p "dist/#{config}"
    
    File.open("dist/#{config}/app-debug.js", "w+") do |out|
      out << File.read("deps/jquery.js") << "\n"
      out << "(function() {\n\n"
      out << "var $ = jQuery.noConflict(true);\n\n"
      
      [
        "configs/#{config}.js",
        "generated/templates.js",
        "src/app.js"
      ].each do |src|
        out << "////// #{src} //////\n\n"
        out << File.read(src) << "\n"
      end
      
      out << "}());\n"
    end
    
    File.open("dist/#{config}/app.css", "w+") do |out|
      Dir["css/*.css"].each do |css|
        out << File.read(css) << "\n"
      end
    end
  end
end

desc "Packs the debug script."
task :pack do
  cd root do
    js = File.read("dist/#{config}/app-debug.js")
    
    File.open("dist/#{config}/app.js", "w+") do |out|
      out << Packr.pack(js, :shrink_vars => true, :protect => ["_out", "_vals"])
    end
  end
end

####

def convert_template(template)
  template_name = File.basename(template, '.html.jst')
  
  buf  = StringIO.new
  buf << "templates['#{template_name}'] = function(_vals) {\n"
  buf << "  var _out = [];\n"
  buf << "  with (_vals || {}) {\n"
  
  File.readlines(template).each do |line|
    line.split(/(\<%.*?%\>)/).each do |segment|
      next if segment.empty?
      
      if segment[0..2] == '<%='
        expr = segment.match(/\<%=(.*?)%\>/).captures.first.strip
        buf << "    _out.push(#{expr});\n"
      elsif segment[0..1] == '<%'
        stmt = segment.match(/\<%(.*?)%\>/).captures.first.strip
        buf << "    #{stmt}\n"
      else
        segment = segment.gsub("'", "\\'").gsub("\n", "\\n")
        buf << "    _out.push('#{segment}');\n"
      end
    end
  end
  
  buf << "  }\n"
  buf << "  return _out.join('');\n"
  buf << "};\n\n"
  
  buf.string
end
