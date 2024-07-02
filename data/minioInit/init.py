import boto3
from os import walk

s3 = boto3.resource('s3', 
    endpoint_url='http://minio:9000',
    aws_access_key_id='your_username',
    aws_secret_access_key='your_pasword',
    aws_session_token=None,
    config=boto3.session.Config(signature_version='s3v4'),
    verify=False
)
    
buckets = [bucket.name for bucket in s3.buckets.all()]
if len(buckets) == 0:
    s3.create_bucket(Bucket="hhz")

filenames = next(walk("data"), (None, None, []))[2]  # [] if no file"
directories = next(walk("data"))[1]

for file in filenames:
    print(file)
    s3.Bucket("hhz").upload_file(Filename='data/{}'.format(file), Key=file, ExtraArgs={'ACL':'public-read'})

for dir in directories:
    print(dir)
    subfiles = next(walk("data/{}".format(dir)), (None, None, []))[2]  # [] if no file"
    for file in subfiles:
        s3.Bucket("hhz").upload_file(Filename='data/{}/{}'.format(dir, file), Key='{}/{}'.format(dir, file), ExtraArgs={'ACL':'public-read'})
