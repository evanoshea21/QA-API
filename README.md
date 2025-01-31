Watch the Video Demo here: [LinkedIn Post](https://www.linkedin.com/feed/update/urn:li:activity:7033946055893282816/)

# Elevated Apparel - Question and Answer API

#### Summary
This API serves up millions of Questions & Answers for [Atelier's e-Commerce site](https://github.com/atelier-front-end/elevated).
Back-end Optimizations allow for real-world traffic spikes of up to **10,000 clients/second** with an error rate of 0.0%

### System Architecture
<p align="center">
<img src="./imgs/Architecture.png"  width="80%">
</p>

## Overview

### Tech Stack

![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

Atelier's Q&A API runs on 4 AWS EC2 instances:
- 2 clone Node Servers (via AWS AMI)
- 1 NGINX Load Balancing Server
- 1 MySql Database w/ Redis Server

### Initial Benchmark (on local machine)

Initial tests showed a repsonse time of > 4000ms. With this benchmark in mind, an initial goal was set for the server to handle 10,0000 clients/second (to handle spikes in traffic) with an error rate of < 1%. These goals were met, primarily from the help of NginX load-balancing (alleviating server restrictions) and MySql indexing (alleviating the database query bottleneck).

<p align="center">
<img src="./imgs/initial2.png"  width="70%">
</p>


## Planning and Considerations

### Database Choice

MySql was chosen for this service for its reliability, scalibility, and speed. The throughput was able to reach very high numbers (10k rps) that may have been difficult to mimic with no-Sql document-based alternatives.

### ETL Process

Originally, a Sql connection was secured via the 'MySql Workbench' software, and data was loaded via the 'Import Wizard.' However, loading the existing Questions (which numbered above 3 mil rows) took over 4 hours, which was likely "fast" compared to how long it could take Answers to load (over 6 mil rows). An alternative strategy was necessary as data had to be transfered numerous times for testing purposes and to migrate from local to deployed sql server.

The alternative strategy was to avail of MySql's 'load infile' CLI command. This reduced transfer time from 4+ hrs down to a whopping 5 minutes, and was used to migrate existing Answers.
<p align="center">
<img src="./imgs/etl.png"  width="70%">
</p>

### Schema Design

The relational database consists of 3 tables (Questions, Answers, and Photos per each Answer):
* Question Schema (questions table)
* Answer Schema (answers table)
* Photos Schema (photos table)

## Performance Optimization & Refactoring

### Local Testing

Before deployment, local optimizations seemed necesssary as simple queries to the DB took over 4 seconds. This wasn't a huge surpise given the 3million and 6 million rows in both question and answer tables, respectively.

##### Indexing
After indexing for the numerical "productId", upon which each Q & A was queried, the response time improved drastically (from 2-4 seconds down to 20-120ms)

|                    Before Indexing                     |                    After Indexing                     |
| :------------------------------------------------: | :-----------------------------------------------: |
| <img src="./imgs/initial.png"  width="100%"> | <img src="./imgs/postIndex.png"  width="100%"> |

##### Node.js Clusters
I decided that Server Requests could be split between multiple child processes to avail of all available CPUs. Forking child-processes overrides Node's default single-thread configuration via the Cluster Module that is shipped with Node.

This afterthought improved local K6 performance metrics from ~500 rps to ~800 rps and reduced request errors from 3.7% to 0.5%

|                    Single-Thread Node Server                     |                    Introduced Node Clusters                     |
| :------------------------------------------------: | :-----------------------------------------------: |
| <img src="./imgs/withOUTCluster.png"  width="120%"> | <img src="./imgs/withClusters.png"  width="120%"> |

### Deployment:

After deploying the MySql database and Node server to separate AWS EC2 instances, stress testing with [loader.io](loader.io) demonstrated that the service could handle throughput of 3250 rps with a 16.6s average response time and an error rate of 12.4%.
<p align="center">
<img src="./imgs/initialDeploy.png"  width="70%">
</p>

### Load Balancing:

To get to the final goal of 1000RPS at <2000ms avg response time, NGINX load-balancer was introduced and deployed to the AWS system to distribute request in a round-robin fashion.
<p align="center">
<img src="./imgs/LB.png"  width="90%">
</p>

### Further Optimizations:

After 2 servers were running, demonstrating excellent metrics, a Redis Server was introduced on the same instance as the MySql Server.
This didn't show concrete results in deployment, as [Loader.io]() was randomly testing the last 10% of a multi-million row database; therefore, it was unlikely that the same cached query would be hit enough times to affect overall response times. 

However, locally response times dropped from ~30ms down to ~5ms for cached queries, which demonstrates that a user using the webpage experience lightning-fast responose times for previously visited pages. 
This would also take stress off of the Database, allowing for more queries until the DB would need to be scaled up due to bottleneck issues.


## Conclusion
The system can consistently handle 10k RPS with 130ms average response time, with an error rate of 0%.
This demonstrates production ready standards for this API to be robust enough to handle real-world incoming traffic.

Stress tests show the breaking point to be around this throughput in a shorter timespan (over 15 seconds, faster ramp up and down).
<p align="center">
<img src="./imgs/breakingPoint.png"  width="70%">
</p>

## Future Improvements

To further optimize this API, a larger computer (AWS instance) with more threads could be deployed to so Node Clusters could be taken advantage of, as they were on the local end.

## Setup Instructions

- Access Ubuntu Node Server instanc(es) with aws ec2 .pem key
- Change `.env` parameters for MySql host to point to correct IP address
- run npm start
- Boot up Mysql Server on Ec2 Instance (Access with aws ec2 .pem key)
- Boot up Nginx, configure new IP address(es) for Node Servers
- Done: Ready for incoming requests to NginX IP address and API endpoints
