def file_tree(root)
  root_files = Dir["#{root}/*"]
  root_files.map do |f|
    # Not working as a one-liner for some reason
    r = /^(\.\/)(.*)$/
    m = f.match(r)
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
  {:project_files => file_tree(settings.project)}.to_json
end

get "/file/*" do
  content_type :json
  {:file_contents => File.read(params[:splat][0])}.to_json
end