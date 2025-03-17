ng add @angular/material    ===material ui

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"> ===bootstrap

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> ===w3 for icon

npm i ng-angular-popup --force
npm i ng-confirm-box --force

@use "@angular/material" as mat;

@include mat.core();

$my-primary: mat.define-palette(mat.$red-palette, 600);
$my-accent: mat.define-palette(mat.$amber-palette, A200, A100, A400);
$my-warn: mat.define-palette(mat.$green-palette, A200, A100, A400);
$my-theme: mat.define-light-theme(
  (
    color: (
      primary: $my-primary,
      accent: $my-accent,
      warn: $my-warn,
    ),
    typography: mat.define-typography-config(),
    density: 0,
  )
);
@include mat.all-component-themes($my-theme);