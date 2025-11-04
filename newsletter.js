
      $(document).ready(function() {
          $('#newsletterForm').on('submit', function(event) {
              event.preventDefault(); // Prevent the default form submission
    
              // Disable the form to prevent multiple submissions
              $(this).find('input[type="submit"]').attr('disabled', true);
    
              $.ajax({
                  url: $(this).attr('action'),
                  method: $(this).attr('method'),
                  data: $(this).serialize(),
                  dataType: 'json',
                  beforeSend: function() {
                      $('.loading').show();
                      $('.error-message').hide();
                      $('.sent-message').hide();
                  },
                  success: function(response) {
                      $('.loading').hide();
                      if (response.ok) {
                          $('.sent-message').fadeIn();
                          setTimeout(function() {
                              $('.sent-message').fadeOut();
                          }, 5000); // Hide after 5 seconds
                      } else {
                          $('.error-message').text('There was an error with your submission. Please try again.').fadeIn();
                      }
                  },
                  error: function() {
                      $('.loading').hide();
                      $('.error-message').text('There was an error with your submission. Please try again.').fadeIn();
                  },
                  complete: function() {
                      // Re-enable the form submit button
                      $('#newsletterForm').find('input[type="submit"]').attr('disabled', false);
                  }
              });
          });
      });
