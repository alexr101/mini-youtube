mini-Youtube is a portofolio app created with Nodejs
  
  It has some of Youtube's basic functionality, and it's fully responsive. To upload new videos simply register as a new user, 
  click the upload button on the header, and paste the youtube link on the link input. Once you submit it your video show in the 
  index page under the category you selected, and it will have a show page to view it.

  Site map

  Index: https://mini-youtube.herokuapp.com/
  Register: https://mini-youtube.herokuapp.com/auth/register
  Login:https://mini-youtube.herokuapp.com/auth/login
  Video-show: https://mini-youtube.herokuapp.com/video/583f3394be9d6b0011ff940d
  Video-new: https://mini-youtube.herokuapp.com/video/new
  Account-show: https://mini-youtube.herokuapp.com/account/alexonezero
  User-show: https://mini-youtube.herokuapp.com/user/thekid
  User-put(use edit buttons to reach this API): https://mini-youtube.herokuapp.com/account/alexonezero


Here are some cool features for quick finding
  
  General:
  All pages are fully responsive
  
  Header:
    Click on the login link to see appended login form
    
  Index page:
    View created in ejs with database information
    Videos are taken from a mongolab database and organized by upload date and category on the home page
    They are integrated into a front end carousel
    Video ad in the home page was created in html5 maker, it's non-functional
    
  Video-show page:
    Clicking the show button displays the description if it's more than 2 lines
    Clicking the Fave video runs an API and favorites the video if it meets the validation requirements
    Clicking the login to comment link appends the login form, so you can login right there
    Clicking on the logged in user comment form (you have to be logged in) will display the reply and cancel buttons
    If video has comments:
      If not logged in:
        Clicking reply button appends login form
     If logged in:
      Clicking on reply appends a reply form
      On reply form, clicking submit will call new comment API and create the comment
    Replies are also enabled and styled
    "Related" Videos are displayes on the side. In this case it's a list of video with matching category. Limited to 7 videos
    
    Todo:Like buttons work, but they don't call an API or update the database
    Todo: Subscribed button does not work, no API in place for it
    Note: Ad on right side is only for showing purposes
    
  User-show page:
    Favorite and uploaded videos are displayed via ejs from the user/uploaded_videos & user/favorite_videos data
    
    Todo: Buttons on profile image header do not work. They are there to work with Angular in the future
    
  Account-show page: (you need to be registered to see this)
    Account information is displayed from database
    Information is editable by clicking on the Edit on each box section.
    Submitting this form will call an API and update your info
    X(remove button) by each favorite video will remove this video from your favorites. (You can favorite any video by clicking
    on the 'Fave' video button below the description on any video you are watching.)
    
    Todo: Left menu (top menu in mobile) is non-functional. This is there to work with Angular in the future
