Bundler.require

configure do
  set :views, ['views/layouts', 'views/pages', 'views/partials']
  enable :sessions

  # TODO: Currently shares self, should be able to share others
  set :project, "#{File.expand_path(File.dirname(__FILE__))}/"

  # FIXME: Remove from release
  set :firebase_url, 'sizzling-fire-124.firebaseio.com'
end

Dir["./app/models/*.rb"].each { |file| require file }
Dir["./app/helpers/*.rb"].each { |file| require file }
Dir["./app/controllers/*.rb"].each { |file| require file }

before "/*" do
  set :erb, :layout => :layout
end

