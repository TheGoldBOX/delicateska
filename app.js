const express = require('express')
const app = express()

app.get('/', function(req, res){
  let N = req.query.N,
      M = req.query.M,
      matrix=[], 
      grid=[],
      addresses=[],
      jsonresponse={}
  
  for (let i=0; i<N; i++){
    matrix[i]=[]
    grid[i]=[]
    for (let j=0; j<M; j++){
      matrix[i][j]=Math.floor(Math.random() * (5 - 1)) + 1
      grid[i][j]=1
    }
  } 
  let h=1
  for (let i=0; i<N; i++){
    for (let j=0; j<M-1; j++){
      if (matrix[i][j] == matrix[i][j+1]) {
        h+=1
      } else {
        if (h>2) {
          while(h!=0){
            grid[i][j-h+1] = 0
            h-=1
          }
        }
        h=1
      }
    }
    if (h>2) {
      let j=matrix[i].length
      while(h!=0){
        grid[i][j-h] = 0
        h-=1
      }
    } 
    h=1  
  }
  for (let i=0; i<M; i++){
    for (let j=0; j<N-1; j++){
      if (matrix[j][i] == matrix[j+1][i]) {h+=1} else {
        if (h>2) {
          while(h!=0){
            grid[j-h+1][i] = 0
            h-=1
          }
        }
        h=1
      }
    }
    if (h>2) {
      let j=matrix.length
      while(h!=0){
        grid[j-h][i] = 0
        h-=1
      }
    } 
    h=1  
  }
  for (let i=0; i<N; i++){
    addresses[i]=[]
    for (let j=0; j<M-1; j++){
      if (grid[i][j] == 0) {
        addresses[i].push([i,j])
      }
    }
  }
  jsonresponse={matrix,addresses}
  // res.send(jsonresponse)
  res.end(JSON.stringify(jsonresponse))
})

app.listen(3000, () => console.log('create server'))