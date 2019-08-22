<?php
namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Response;
use App\Services\ApiResponse;

class BuildApiResponse
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);
        if (!empty($response->exception)) {
            return $response;
        }
        $original = $response->getOriginalContent();
        return ApiResponse::success($original);
    }
}
