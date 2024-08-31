{/* <hr class="w-80">

  <div class="comments my-3" >
    <h1 class="h1">Comments</h1>

    <div class="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1">

      <% for(comment of image.Comments){ %>
        <div class="container mt-5">
          <div class="comment-box border-bottom">
              <div class="comment-header">
                  <img src="/uploads/ProfilePictures/<%= comment.owner.ProfilePic.FileName %>" alt="User Avatar" class="comment-avatar">
                  <div class="comment-content">
                      <div><span class="comment-username"> <%= comment.owner.username %> </span> <%= comment.Message %> </div>
                      <div class="comment-footer my-2">
                          <span class="mx-3">1d</span>
                          <a href="#">102 likes</a>
                          <a href="#">Reply</a>
                      </div>
                  </div>
              </div>
              <div class="comment-footer mx-5 ">
                  <a href="#">  ----  View 39 replies</a>
              </div>
          </div>
        </div>
      <%}%>

    </div>
  </div>

    
    
  <%if(currUser){%>
      <div class="mt-6">
        <form action="/Rooms/<%= roomInfo._id %>/AddImages/<%= image._id %>/comments" method="post" novalidate class="needs-validation">
          <div class="Comment-Message d-flex mx-auto">
            <div class="mb-3">
              <textarea class="form-control pt-4" name="Comment[Message]" placeholder="Enter Your Comment Here.." style="width: 80vw"  required></textarea>
              <div class="invalid-feedback">Please Enter Your Comment</div>
            </div>
            <div class="Message-Send">
              <button type="submit" class="btn btn-outline-success mt-2 mx-3 px-6 py-3"> Send </button>
            </div>
          </div>
        </form>
      </div>
  <%}%></hr>  */}