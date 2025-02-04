build
```bash
docker build . -t ctnelson1997/cs571-s25-hw2-api
docker push ctnelson1997/cs571-s25-hw2-api
```

run
```bash
docker pull ctnelson1997/cs571-s25-hw2-api
docker run --name=cs571_s25_hw2_api -d --restart=always -p 58102:58102 -v /cs571/s25/hw2:/cs571 ctnelson1997/cs571-s25-hw2-api
```