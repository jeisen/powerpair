require 'sinatra'
require 'json'

if development?
  require 'sinatra/reloader'
  require 'ruby-debug'
end

configure do
  set :views, ['views/layouts', 'views/pages', 'views/partials']
  enable :sessions

  # TODO: Currently shares self, should be able to share others
  set :project, "#{File.expand_path(File.dirname(__FILE__))}/"

  set :firebase_url, 'YOUR_FIREBASE_URL'
end

Dir["./app/models/*.rb"].each { |file| require file }
Dir["./app/helpers/*.rb"].each { |file| require file }
Dir["./app/controllers/*.rb"].each { |file| require file }
