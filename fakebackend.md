# SPA vs. MPA

- Muita gente diz que desenvolver SPA é mais fácil, rápido e simples, porque você não precisa fazer código de UI/view no servidor...
- Sei disso não!
- Mudanças dos dois lados - MPA pode mudar conteúdo dinamicamente; SPA pode ser pré-renderizada no servidor; CSRF e XSS mais difíceis hoje em dia `TODO`
-

# faking manually

## Interceptor

Gil Fink sugere fazer algo do tipo:

```javascript
// Gil Fink https://medium.com/@gilfink/quick-tip-creating-an-xmlhttprequest-interceptor-1da23cf90b76
let oldXHROpen = window.XMLHttpRequest.prototype.open;
window.XMLHttpRequest.prototype.open = function(
  method,
  url,
  async,
  user,
  password
) {
  // do something with the method, url and etc.
  this.addEventListener("load", function() {
    // do something with the response text
    console.log("load: " + this.responseText);
  });

  return oldXHROpen.apply(this, arguments);
};
```

Podemos estender essa base e chegar em:

```
TODO
aaaaahhhhh ver aqui como tentar reproduzir o interceptor!!!!
```

## Parse de rotas

## BD local e mutável

# MirageJS

## rotas e maravilhas

## operações com o bd

## relacionamentos

## GO NUTS! afterCreate, dependent attributes

## factories and traits

## complexidade só o necessário, quando necessário

## delay

## serializers: JSONAPI, ActiveModel, RestSerializer

## mockando testes

## mirage no angular

## mirage no react

## other tools: pretender

## protótipo de altíssima fidelidade

-
