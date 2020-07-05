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
                cy.get('button').contains('like').click()// Need to Double Click

                cy.contains('likes : 1')
            })

            it('A blog can be deleted',function(){ 
                cy.get('button').contains('view').click()
                cy.get('button').contains('delete').click()
                cy.on('window:confirm',() => true)
                cy.contains('test-title blog has been deleted')
            })

            it('Trying to delete blog with different user',function() {
                cy.get('button').contains('logout').click()
                const testuser1 =
                {
                    name : 'testuser1',
                    username : 'tester1',
                    password : 'pass'
                }
                cy.request('POST','http://localhost:3001/api/users/',testuser1)
                cy.visit('http://localhost:3001')
                cy.get('#username').type('tester1')
                cy.get('#password').type('pass')
                cy.get('button').contains('login').click()

                cy.contains('testuser1 is logged in')

                cy.get('button').contains('view').click()
                cy.get('button').contains('delete').click()
                cy.on('window:confirm',() => true)

                cy.contains('Blog not created by the login user, so cant delete')

            })
        })
        
    })
})

