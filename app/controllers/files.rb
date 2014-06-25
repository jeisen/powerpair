def file_tree(root)
  root_files = Dir["#{root}/*"]
  root_files.sort.map do |f|
    relative_path = relative_to_root(f)

    if File.directory?(f)
      [relative_path, file_tree(f)]
    else
      [relative_path, nil]
    end
  end
end

def relative_to_root(filename)
  full_path = File.expand_path(filename, settings.project)
  full_path[settings.project.length, full_path.length]
end

# JSON containing a list (in :project_files) where each file is an array
# First element is filename, second is either nil (not a directory) or the subtree
get "/files" do
  content_type :json
  {:root => settings.project, :project_files => file_tree(settings.project)}.to_json
end

get "/file/*" do
  content_type :json
  filename = File.expand_path(params[:splat][0], settings.project)
  {:file_contents => File.read(filename), :filename => relative_to_root(filename)}.to_json
end

post "/file/*" do
  filename = File.expand_path(params[:splat][0], settings.project)
  contents = params[:contents]
  f = File.open(filename, 'w')
  f.write(contents)
  f.close
end