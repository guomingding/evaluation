FROM registry.zjvis.org/xiongkai/pgdw:d3.2
# FROM python:3.7

WORKDIR /evaluation
COPY ./ /evaluation

EXPOSE 80
# RUN pip install -i https://pypi.tuna.tsinghua.edu.cn/simple flask

CMD ["python", "backend/app.py"]
