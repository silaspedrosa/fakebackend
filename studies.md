### concatMap vs mergeMap vs switchMap vs exhaustMap

https://blog.angular-university.io/rxjs-higher-order-mapping/

```
The behavior of concatMap, mergeMap, switchMap and exhaustMap is similar in the sense they are all higher order mapping operators.

But its also so different in so many subtle ways, that there isn't really one operator that can be safely pointed to as a default.

Instead, we can simply choose the appropriate operator based on the use case:

if we need to do things in sequence while waiting for completion, then concatMap is the right choice

for doing things in parallel, mergeMap is the best option

in case we need cancellation logic, switchMap is the way to go

for ignoring new Observables while the current one is still ongoing, exhaustMap does just that
```

