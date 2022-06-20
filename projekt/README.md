Bazy danych:
   1. Mongo:
      1. mongo-config (configMap):
         mapuje zmienną "mongo-url" na adres serwisu kontenera mongo
      2. mongo-secret:
         przechowuje hasło i nazwe użtkownika użyte przy tworzeniu bazy danych mongo
      3. mongo-volume:
         volumen używany przez mongo
      4. mongo:
         składa się z mongo servicu i mongo deploymentu
         1. serwis wystawiony przez przezClusterIP
         2. 1 replika ponieważ do więcej niż 1 repliki trzeba by było użyć statefulset co jest bardziej skomplikowane więc na razie jest jedna.

   2. Redis
      1. redis-config (configMap):
         mapuje ustawienia do redisa i url do serwisu redisa
      3. redis-volume:
         volumen używany przez redisa
      4. redis:
         składa się z redis servicu i redis deploymentu
         1. serwis wystawiony przez przezClusterIP
         2. 1 replika ponieważ do więcej niż 1 repliki trzeba by było użyć statefulset co jest bardziej skomplikowane więc na razie jest jedna.

Api
   1. Wystawione przez ClusterIP
   2. 2 repliki -> jak jedna przestanie działać to zastąpi ją druga

Front
   1. Wystawione przez ClusterIP
   2. 2 repliki -> jak jedna przestanie działać to zastąpi ją druga

Ingress
   Wystawione na http://localhost:80", możliwość zmiany na jaki kolwiek inny link, testowo localhost.
   Ingress przekazuje ruch na "front-service", serwis frontendu.

Jest też namespace "production" w którym aktualnie znajdują się wszystkie opisane wyżej rzeczy.
