export default async function handler(req, res) {
  if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
        }

          try {
              const { naam, email, telefoon, bericht } = req.body;

                  // Validate required fields
                      if (!naam || !email || !bericht) {
                            return res.status(400).json({ 
                                    error: 'Missing required fields: naam, email, bericht' 
                                          });
                                              }

                                                  // Validate email format
                                                      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                                          if (!emailRegex.test(email)) {
                                                                return res.status(400).json({ error: 'Invalid email format' });
                                                                    }

                                                                        // Log the submission (in production, this could be saved to a database)
                                                                            const submission = {
                                                                                  id: Math.random().toString(36).substr(2, 9),
                                                                                        timestamp: new Date().toISOString(),
                                                                                              naam,
                                                                                                    email,
                                                                                                          telefoon: telefoon || 'N/A',
                                                                                                                bericht,
                                                                                                                      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress
                                                                                                                          };
                                                                                                                          
                                                                                                                              console.log('Form submission received:', submission);
                                                                                                                              
                                                                                                                                  // Optional: Send email notification
                                                                                                                                      // This would require configuring nodemailer with SMTP credentials
                                                                                                                                          // For now, we just log the submission
                                                                                                                                          
                                                                                                                                              return res.status(200).json({
                                                                                                                                                    success: true,
                                                                                                                                                          message: 'Form submitted successfully',
                                                                                                                                                                submissionId: submission.id
                                                                                                                                                                    });
                                                                                                                                                                    
                                                                                                                                                                      } catch (error) {
                                                                                                                                                                          console.error('Form submission error:', error);
                                                                                                                                                                              return res.status(500).json({ 
                                                                                                                                                                                    error: 'Internal server error',
                                                                                                                                                                                          message: error.message 
                                                                                                                                                                                              });
                                                                                                                                                                                                }
                                                                                                                                                                                                }
