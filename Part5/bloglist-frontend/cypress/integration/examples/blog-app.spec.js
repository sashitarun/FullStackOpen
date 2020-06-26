describe('Blog app', function(){
    beforeEach(function(){
        cy.request('POST','http://localhost:3001/api/testing/reset')
        const testuser =
        {
            name : 'testuser',
            username : 'tester',
            password : 'pass'
        }
        cy.request('POST','http://localhost:3001/api/users/',testuser)
        cy.visit('http://localhost:3001')
    })

    it(' Checking login page ', function(){
        cy.contains('login')
        cy.get('button').contains('login')
    })

    describe('Login Trails', function() {

        it('succeeds with correct credentials', function(){
            cy.get('#username').type('tester')
            cy.get('#password').type('pass')
            cy.get('button').contains('login').click()

            cy.contains('testuser is logged in')
        })

        it('fails with wrong credentials',function(){

            cy.get('#username').type('tester')
            cy.get('#password').type('wrong')
            cy.get('button').contains('login').click()

            cy.contains('Wrong Credentials')

        })
    })

    describe('When Logged in', function() {

        beforeEach(function(){
            cy.get('#username').type('tester')
            cy.get('#password').type('pass')
            cy.get('button').contains('login').click()

            cy.contains('testuser is logged in')
        })

        it('A blog can be created',function(){
            cy.get('button').contains('create').click()
            cy.contains('title')

            cy.get('#title').type('test-title')
            cy.get('#author').type('test-author')
            cy.get('#url').type('test-url')
            cy.get('#createBlog').click()

            cy.contains('test-title test-author')
        })

        describe('After creating a blog', () => {
            beforeEach(function(){

                cy.get('button').contains('create').click()
                cy.contains('title')

                cy.get('#title').type('test-title')
                cy.get('#author').type('test-author')
                cy.get('#url').type('test-url')
                cy.get('#createBlog').click()

                cy.contains('test-title test-author')
            })

            it('A blog can be liked',function(){
                cy.get('button').contains('view').click()

                cy.contains('likes : 0')
                cy.get('button').contains('like').click().click() // Need to Double Click

                cy.contains('likes : 1')
            })

            it('A blog can be deleted',function(){
                cy.get('button').contains('view').click()
                cy.contains('likes : 0')
                cy.get('button').contains('like').click().click()// Need to Double Click
                cy.contains('likes : 1')

                // Above Steps are done so that the username get updated on the blog 
                cy.get('button').contains('delete').click()

            })
        })
        
    })
    
    
    
})
