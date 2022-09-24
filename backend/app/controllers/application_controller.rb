class ApplicationController < ActionController::API
  before_action :fake_load, if: :env_development

  def env_development
    Rails.env.development?
  end

  # For checking SPA behavior
  def fake_load
    sleep(1)
  end
end
