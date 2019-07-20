/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will for the application.
 */

/* All tests are placed within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* Tests to make sure that the allFeeds variable
         *  has been defined and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URLs are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        })


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('names are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            })
        })
    });


    /* Test suite to test Menu function */
    describe('The menu', function() {

        /* Test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden', function() {
            let menu = document.body;
            expect(menu).toHaveClass('menu-hidden');
        })

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         it('displays', function() {
            let menu = document.querySelector('.menu-icon-link')
            menu.click();
            expect(document.body).not.toHaveClass('menu-hidden');
            // Click again to close the menu on load
            menu.click();
            expect(document.body).toHaveClass('menu-hidden');
         });

    })


    /* Test suite to test initial feed function */
    describe('Initial entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('contain at least one item', function() {
            expect(document.getElementsByClassName('entry')).not.toBe(0);
        });
    });

    /* Test suite to test new feed selection function */
    describe('New feed selection', function() {
        let page_one;
        let page_two;

        beforeEach(function(done) {
            loadFeed(0, function() {
                page_one = document.querySelector('.feed').innerHTML;
                loadFeed(1, function() {
                    page_two = document.querySelector('.feed').innerHTML;
                    done();
                });
            });
        });

        /* Test that ensures when a new feed is loaded
         */
        it('updates content', function(done) {
            console.log(page_one);
            console.log(page_two);
            expect(page_one).not.toEqual(page_two);
        });
    });
}());
