def file_tree(root)
  root_files = Dir["#{root}/*"]
  root_files.map do |f|
    if File.directory?(f)
      [f, file_tree(f)]
    else
      [f, nil]
    end
  end
end

# JSON containing a list (in :project_files) where each file is an array
# First element is filename, second is either nil (not a directory) or the subtree
get "/files" do
  content_type :json
  {:project_files => file_tree(settings.project)}.to_json
end
