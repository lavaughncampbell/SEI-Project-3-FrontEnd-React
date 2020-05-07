import React from 'react'
import { Card, Button } from 'semantic-ui-react'

export default function PostList(props) {
  console.log("props in DogList");
  console.log(props);
  const posts = props.posts.map(post => {
    return(
      <Card key={post.id} color={"red"}>
        <Card.Content textAlign={"center"}>        
          <Card.Header>
            {post.description}
          </Card.Header>
          <Card.Meta>
            {post.comment}
          </Card.Meta>
          <Card.Description>
            {post.description} is a {post.comment} that belongs to {post.user.username}
          </Card.Description>
        </Card.Content>
        <Card.Content textAlign={"center"}> 
          <Button 
            basic 
            color='red'
            onClick={ () => props.deletePost(post.id) }
          >
            Delete {post.description}
          </Button>
          <Button 
            basic 
            color='green'
            onClick={ () => props.editPost(post.id) }
          >
            Edit {post.description}
          </Button>
        </Card.Content>

      </Card>
    )
  })

  return (
    <Card.Group centered={true}>
      {posts}
    </Card.Group>
  )
}