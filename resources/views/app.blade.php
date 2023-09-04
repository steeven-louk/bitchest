<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" href="assets/bitchest_logo.png" type="image/png">
        {{-- <link rel="shortcut icon" href={{ asset('bitchest_logo.png') }} type="image/png"> --}}
        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">

        <!-- Scripts -->
        @routes
        <link rel="stylesheet" href="{{ mix('css/app.css') }}">


        <script src="{{ mix('js/app.js') }}" defer></script>
        {{-- @vite('resources/js/app.jsx') --}}

        @inertiaHead
    </head>
    <body class="font-sans antialiased" id="App" >
        @inertia
    </body>
</html>
