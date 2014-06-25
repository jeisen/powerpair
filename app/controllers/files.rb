def file_tree(root)
  root_files = Dir["#{root}/*"]
  root_files.sort.map do |f|
    relative_path = f.index(settings.project) == 0 ? f[settings.project.length, f.length] : f

    # Not working as a one-liner for some reason
    r = /^(\.\/)?(.*)$/
    m = relative_path.match(r)
    stripped = $2
    if File.directory?(f)
      [stripped, file_tree(f)]
    else
      [stripped, nil]
    end
  end
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
  {:file_contents => File.read(filename), :filename => filename}.to_json
end

post "/file/*" do
  filename = File.expand_path(params[:splat][0], settings.project)
  contents = params[:contents]
  File.write(filename, contents)
end