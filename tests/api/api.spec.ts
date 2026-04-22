import { test, expect } from '@playwright/test'

test.describe.parallel('API Testing', () => {
  const baseUrl = 'https://jsonplaceholder.typicode.com/'

  test('Simple API test - Assert Response Status', async ({ request }) => {
    const response = await request.get(`${baseUrl}/posts/2`)
    expect(response.status()).toBe(200)

    const responseBody = JSON.parse(await response.text())
    //console.log(responseBody)
  })

  test('Simple API test - Assert Invalid Enpoint', async ({ request }) => {
    const response = await request.get(`${baseUrl}/invalid-endpoint`)

    expect(response.status()).toBe(404)
  })

  test('GET Request - Get post detail', async ({ request }) => {
    const response = await request.get(`${baseUrl}/posts/1`)

    const responseBody = JSON.parse(await response.text())

    expect(response.status()).toBe(200)
    expect(responseBody.id).toBe(1)
    expect(responseBody.title).toBe(
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    )
    expect(responseBody.body).toBeTruthy()
    console.log(responseBody)
  })

  test('POST Request - Create a new post', async ({ request }) => {
    const newPost = {
      title: 'foo',
      body: 'bar',
      userId: 1,
    }
    const response = await request.post(`${baseUrl}/posts`, {
      data: newPost,
    })

    expect(response.status()).toBe(201)
    const responseBody = JSON.parse(await response.text())
    expect(responseBody.id).toBeTruthy()
    expect(responseBody.title).toBe(newPost.title)
    expect(responseBody.body).toBe(newPost.body)
    expect(responseBody.userId).toBe(newPost.userId)
    // console.log(responseBody)
  })
  test('PUT Request - Update a post', async ({ request }) => {
    const response = await request.put(`${baseUrl}/posts/1`, {
      data: {
        id: 1,
        title: 'food',
        body: 'bar',
        userId: 1,
      },
    })

    const responseBody = JSON.parse(await response.text())

    expect(response.status()).toBe(200)
    expect(responseBody.id).toBe(1)
    console.log(responseBody)
  })

  test('DELETE Request - Delete a post', async ({ request }) => {
    const response = await request.delete(`${baseUrl}/posts/1`)

    expect(response.status()).toBe(200)
  })
})
