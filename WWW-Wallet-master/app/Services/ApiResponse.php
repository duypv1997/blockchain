<?php

namespace App\Services;

use Illuminate\Support\Collection;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ApiResponse
{
    public static function success($rawData = [], array $meta = [], $httpCode = 200)
    {
        $data = $rawData;

        if ($data instanceof LengthAwarePaginator) {
            $rawData = $rawData->toArray();
            $data = $rawData['data'];
            $meta = $rawData;
            unset($meta['data']);
        }

        $meta = array_merge(['timestamp' => time()], $meta);
        return response()->json([
            'success' => true,
            'data' => $data,
            'meta' => $meta,
        ], $httpCode);
    }

    public static function renderError(Exception $exception)
    {
        $message = $exception->getMessage();

        if ($exception instanceof ModelNotFoundException && Auth::check()) {
            return self::errorNotFound(__('No query results for model'));
        } elseif ($exception instanceof AuthorizationException) {
            return self::errorUnauthorized($message);
        } elseif ($exception instanceof NotFoundHttpException) {
            return self::errorNotFound();
        } elseif ($exception instanceof AccessDeniedHttpException) {
            return self::errorForbidden();
        } elseif ($exception instanceof ValidationException) {
            return self::errorValidation($exception);
        } else {
            return self::errorInternalError($message);
        }
    }

    public static function error($message, array $meta = [], $httpCode = 500, array $errors = [])
    {
        $meta = array_merge(['timestamp' => time()], $meta);
        return response()->json([
            'success' => false,
            'message' => $message,
            'errors' => $errors,
            'meta' => $meta,
        ], $httpCode);
    }

    public static function errorForbidden($message = 'Forbidden', array $meta = [])
    {
        return self::error($message, $meta, 403);
    }

    public static function errorInternalError($message = 'Internal Server Error', array $meta = [])
    {
        return self::error($message, $meta, 500);
    }

    public static function errorNotFound($message = 'Resource Not Found', array $meta = [])
    {
        return self::error($message, $meta, 404);
    }

    public static function errorUnauthorized($message = 'Unauthorized', array $meta = [])
    {
        return self::error($message, $meta, 401);
    }

    public static function errorWrongArgs($message, array $meta = [])
    {
        return self::error($message, $meta, 400);
    }

    public static function errorMethodNotAllowed($message = 'Method Not Allowed', array $meta = [])
    {
        return self::error($message, $meta, 405);
    }

    public static function errorValidation($exception, array $meta = [])
    {
        $message = $exception->getMessage();
        $errors = $exception->errors();
        $status = $exception->status;
        return self::error($message, $meta, $status, $errors);
    }
}
