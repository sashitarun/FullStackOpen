import React from 'react'
import Blog from './Blog'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Togglable from './Togglable'

test('renders title & author', () => {

    const newBlog = {
        title : 'testtitle',
        author : 'testauthor',
        url : '//',
        likes : 7,
        user : {
            name : 'testusername'
        }
    }

    const component = render(
        <Blog blog={newBlog}/>
    )
    
    expect(component.container).toHaveTextContent('testtitle')
    expect(component.container).toHaveTextContent('testauthor')
})


describe('Test for toggle based components', () => {
    let component

    beforeEach(() =>
    {   
        const newBlog = {
            title : 'testtitle',
            author : 'testauthor',
            url : 'testurl',
            likes : 7,
            user : {
                name : 'testusername'
            }
        }

        component = render(
            <Blog blog={newBlog} />
        )
    })

    test('url and likes', () => {
        const button = component.getByText('view')
        fireEvent.click(button)

        const div = component.container.querySelector('.togglableContent')
        console.log(prettyDOM(div))
        expect(div).toHaveTextContent('testurl')
        //expect(div).toHaveTextContent('likes')
      })

    // test('testing likes functionlaity',() => {

    //     const button = component.getByText('view')
    //     fireEvent.click(button)

    //     const likeButton = component.getByText('like')
    //     fireEvent.click(likeButton)

    //     const div = component.container.querySelector('.togglableContent')
    //     expect(div).toHaveTextContent('8')

    // })
})




