<?php

namespace App\Providers;

use Illuminate\View\ViewServiceProvider as BaseViewServiceProvider;
use Illuminate\View\FileViewFinder;
use Jenssegers\Agent\Agent;

class ViewServiceProvider extends BaseViewServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // 
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        parent::register();
    }

    /**
     * Register the view finder implementation.
     *
     * @return void
     */
    public function registerViewFinder()
    {
        $agent = new Agent();
        if (!$agent->isMobile()) {
            parent::registerViewFinder();
            return;
        }
        $this->app->bind('view.finder', function ($app) {
            $paths = [resource_path('views/mobile')];
            return new FileViewFinder($app['files'], $paths);
        });
    }
}
