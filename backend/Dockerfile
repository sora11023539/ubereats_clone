FROM ruby:3.1.0
# apt-get = Manage packages using APT library
# --qq = Not display other than error
# -y = Answer Yes to all inquiries
# build-essential = For installing a set of packages necessary to create a debian package
# libpq-dev = Required to install DBD::Pg for connecting DBI to PostgreSQL server with Perl
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

WORKDIR /ubereats_react_rails
# COPY = Copy file and folder to container
COPY Gemfile /ubereats_react_rails/Gemfile
COPY Gemfile.lock /ubereats_react_rails/Gemfile.lock
RUN bundle install
COPY . /ubereats_react_rails

COPY entrypoint.sh /usr/bin/
# chmod +x = Grant execute privilege
RUN chmod +x /usr/bin/entrypoint.sh
# ENTRYPOINT = Provide commands and arguments to running containers
ENTRYPOINT ["entrypoint.sh"]
# EXPOSE = Publish the port num
EXPOSE 3000

# CMD = Provide commands and arguments to running containers
CMD ["rails", "server", "-b", "0.0.0.0"]
