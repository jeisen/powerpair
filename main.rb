Bundler.require

configure do
  set :views, ['views/layouts', 'views/pages', 'views/partials']
  set :project, "#{File.expand_path(File.dirname(__FILE__))}/"
  enable :sessions
end

Dir["./app/models/*.rb"].each { |file| require file }
Dir["./app/helpers/*.rb"].each { |file| require file }
Dir["./app/controllers/*.rb"].each { |file| require file }

before "/*" do
  if mobile_request?
    set :erb, :layout => :mobile
  else
    set :erb, :layout => :layout
  end
end

