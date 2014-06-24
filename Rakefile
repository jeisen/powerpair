desc "List all routes for this application"
task :routes do
  puts `grep '^[get|post|put|delete].*do$' app/controllers/*.rb | sed 's/ do$//'`
end
