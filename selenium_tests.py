import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class LoginTestCases(unittest.TestCase):

    def setUp(self):
        """Setup the test environment before each test."""
        self.driver = webdriver.Chrome()
        self.driver.get("https://cs458.netlify.app/")

    def test_successful_login(self):
        """Test user can login successfully with correct credentials."""
        driver = self.driver
        driver.find_element(By.NAME, "email").send_keys("test@gmail.com")
        driver.find_element(By.NAME, "password").send_keys("1")
        driver.find_element(By.XPATH, "//button[contains(text(),'Sign in Now')]").click()
        WebDriverWait(driver, 10).until(EC.url_contains("/home")) 

    def test_invalid_login(self):
        """Test system behavior with invalid login credentials."""
        driver = self.driver
        driver.find_element(By.NAME, "email").send_keys("wrong@example.com")
        driver.find_element(By.NAME, "password").send_keys("wrongpassword")
        driver.find_element(By.XPATH, "//button[contains(text(),'Sign in Now')]").click()
        # Check for error message
        error_message = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.XPATH, "//div[contains(@class,'toast')]"))
        )
        self.assertIn("Invalid credentials", error_message.text)

    def test_empty_fields(self):
        """Test validation messages for empty fields."""
        driver = self.driver
        driver.find_element(By.NAME, "email").send_keys("")  
        driver.find_element(By.NAME, "password").send_keys("")  
        driver.find_element(By.XPATH, "//button[contains(text(),'Sign in Now')]").click()
        # Check for validation messages (modify as per actual validation messages in your app)
        WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, "email-helper-text")))
        WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, "password-helper-text")))

    def test_google_login(self):
        """Test logging in using Google OAuth."""
        driver = self.driver
        # This will depend on how your Google login is implemented, you might need to adjust this
        driver.find_element(By.XPATH, "//div[contains(text(),'Google Login')]").click()
        # Add steps for Google login flow, note this can be complex due to Google's login mechanisms and might require additional handling

    def test_ui_elements_presence(self):
        """Check all UI elements are present."""
        driver = self.driver
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "email")))
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "password")))
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//button[contains(text(),'Sign in Now')]")))
        # Add more checks for other elements as needed

    def tearDown(self):
        """Tear down the test environment after each test."""
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()
