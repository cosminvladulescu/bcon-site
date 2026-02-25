#!/usr/bin/env python3
"""
Backend API Testing for B-CON Consulting Website
Tests all endpoints including public and admin routes
"""

import requests
import sys
import json
from datetime import datetime
from typing import Dict, Any, Optional

class BCONAPITester:
    def __init__(self, base_url="https://bcon-consulting.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.admin_token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []
        
    def log_test(self, name: str, success: bool, details: str = ""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            
        result = {
            "test": name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} - {name}")
        if details:
            print(f"    {details}")
    
    def make_request(self, method: str, endpoint: str, data: Optional[Dict] = None, 
                    headers: Optional[Dict] = None, expected_status: int = 200) -> tuple:
        """Make HTTP request and return success status and response"""
        url = f"{self.base_url}/{endpoint}"
        
        # Default headers
        req_headers = {'Content-Type': 'application/json'}
        if headers:
            req_headers.update(headers)
            
        try:
            if method == 'GET':
                response = requests.get(url, headers=req_headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=req_headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=req_headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=req_headers, timeout=10)
            else:
                return False, {}, f"Unsupported method: {method}"
                
            success = response.status_code == expected_status
            
            try:
                response_data = response.json()
            except:
                response_data = {"text": response.text}
                
            details = f"Status: {response.status_code}"
            if not success:
                details += f" (expected {expected_status})"
                if response_data.get('detail'):
                    details += f" - {response_data['detail']}"
                    
            return success, response_data, details
            
        except requests.exceptions.RequestException as e:
            return False, {}, f"Request failed: {str(e)}"
    
    def test_health_endpoints(self):
        """Test basic health and info endpoints"""
        print("\n🔍 Testing Health Endpoints...")
        
        # Test root endpoint
        success, data, details = self.make_request('GET', '')
        self.log_test("Root endpoint", success, details)
        
        # Test health endpoint
        success, data, details = self.make_request('GET', 'health')
        self.log_test("Health check", success, details)
    
    def test_contact_form(self):
        """Test contact form submission"""
        print("\n📧 Testing Contact Form...")
        
        # Valid contact submission
        contact_data = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "+40700000000",
            "company": "Test Company SRL",
            "message": "This is a test message for B-CON Consulting contact form."
        }
        
        success, data, details = self.make_request('POST', 'contact', contact_data, expected_status=200)
        self.log_test("Contact form submission", success, details)
        
        if success and 'id' in data:
            self.contact_id = data['id']
            self.log_test("Contact form returns ID", True, f"Contact ID: {self.contact_id}")
        
        # Test invalid contact (missing required fields)
        invalid_data = {"name": "Test", "email": "invalid-email"}
        success, data, details = self.make_request('POST', 'contact', invalid_data, expected_status=422)
        self.log_test("Contact form validation", success, details)
    
    def test_public_blog_endpoints(self):
        """Test public blog endpoints"""
        print("\n📝 Testing Public Blog Endpoints...")
        
        # Get published blog posts
        success, data, details = self.make_request('GET', 'blog')
        self.log_test("Get published blog posts", success, details)
        
        # Test blog post by slug (will likely 404 since no posts exist)
        success, data, details = self.make_request('GET', 'blog/test-slug', expected_status=404)
        self.log_test("Get blog post by slug (404 expected)", success, details)
    
    def test_public_testimonials(self):
        """Test public testimonials endpoint"""
        print("\n⭐ Testing Public Testimonials...")
        
        success, data, details = self.make_request('GET', 'testimonials')
        self.log_test("Get active testimonials", success, details)
    
    def test_public_projects(self):
        """Test public projects endpoints"""
        print("\n🏗️ Testing Public Projects...")
        
        # Get all projects
        success, data, details = self.make_request('GET', 'projects')
        self.log_test("Get all projects", success, details)
        
        # Get featured projects
        success, data, details = self.make_request('GET', 'projects/featured')
        self.log_test("Get featured projects", success, details)
    
    def test_admin_auth(self):
        """Test admin authentication"""
        print("\n🔐 Testing Admin Authentication...")
        
        # Test admin registration
        admin_data = {
            "email": f"admin-test-{datetime.now().strftime('%H%M%S')}@bcon.ro",
            "password": "TestPassword123!",
            "name": "Test Admin"
        }
        
        success, data, details = self.make_request('POST', 'admin/register', admin_data)
        self.log_test("Admin registration", success, details)
        
        if success and 'access_token' in data:
            self.admin_token = data['access_token']
            self.admin_email = admin_data['email']
            self.log_test("Admin token received", True, "Token stored for further tests")
            
            # Test admin login with same credentials
            login_data = {
                "email": admin_data['email'],
                "password": admin_data['password']
            }
            success, data, details = self.make_request('POST', 'admin/login', login_data)
            self.log_test("Admin login", success, details)
            
            # Test admin profile
            headers = {'Authorization': f'Bearer {self.admin_token}'}
            success, data, details = self.make_request('GET', 'admin/me', headers=headers)
            self.log_test("Get admin profile", success, details)
        else:
            self.log_test("Admin registration failed", False, "Cannot proceed with admin tests")
    
    def test_admin_blog_management(self):
        """Test admin blog management"""
        if not self.admin_token:
            print("\n❌ Skipping admin blog tests - no admin token")
            return
            
        print("\n📝 Testing Admin Blog Management...")
        headers = {'Authorization': f'Bearer {self.admin_token}'}
        
        # Get all blog posts (admin view)
        success, data, details = self.make_request('GET', 'admin/blog', headers=headers)
        self.log_test("Admin get all blog posts", success, details)
        
        # Create a blog post
        blog_data = {
            "title": "Test Blog Post",
            "slug": f"test-blog-post-{datetime.now().strftime('%H%M%S')}",
            "excerpt": "This is a test blog post excerpt for testing purposes.",
            "content": "This is the full content of the test blog post. It contains detailed information about construction consulting services.",
            "category": "Test Category",
            "published": True
        }
        
        success, data, details = self.make_request('POST', 'admin/blog', blog_data, headers=headers)
        self.log_test("Create blog post", success, details)
        
        if success and 'id' in data:
            blog_id = data['id']
            
            # Update the blog post
            update_data = {"title": "Updated Test Blog Post", "published": False}
            success, data, details = self.make_request('PUT', f'admin/blog/{blog_id}', update_data, headers=headers)
            self.log_test("Update blog post", success, details)
            
            # Delete the blog post
            success, data, details = self.make_request('DELETE', f'admin/blog/{blog_id}', headers=headers)
            self.log_test("Delete blog post", success, details)
    
    def test_admin_contact_management(self):
        """Test admin contact management"""
        if not self.admin_token:
            print("\n❌ Skipping admin contact tests - no admin token")
            return
            
        print("\n📧 Testing Admin Contact Management...")
        headers = {'Authorization': f'Bearer {self.admin_token}'}
        
        # Get all contacts
        success, data, details = self.make_request('GET', 'admin/contacts', headers=headers)
        self.log_test("Admin get all contacts", success, details)
        
        # If we have a contact ID from earlier test, try to mark it as read
        if hasattr(self, 'contact_id'):
            success, data, details = self.make_request('PUT', f'admin/contacts/{self.contact_id}/read', {}, headers=headers)
            self.log_test("Mark contact as read", success, details)
    
    def test_admin_testimonials_management(self):
        """Test admin testimonials management"""
        if not self.admin_token:
            print("\n❌ Skipping admin testimonials tests - no admin token")
            return
            
        print("\n⭐ Testing Admin Testimonials Management...")
        headers = {'Authorization': f'Bearer {self.admin_token}'}
        
        # Get all testimonials (admin view)
        success, data, details = self.make_request('GET', 'admin/testimonials', headers=headers)
        self.log_test("Admin get all testimonials", success, details)
        
        # Create a testimonial
        testimonial_data = {
            "client_name": "Ion Popescu",
            "company": "Test Construction SRL",
            "role": "Director General",
            "content": "B-CON Consulting ne-a ajutat enorm în gestionarea contractelor publice. Recomand cu încredere!",
            "rating": 5,
            "is_active": True
        }
        
        success, data, details = self.make_request('POST', 'admin/testimonials', testimonial_data, headers=headers)
        self.log_test("Create testimonial", success, details)
        
        if success and 'id' in data:
            testimonial_id = data['id']
            
            # Delete the testimonial
            success, data, details = self.make_request('DELETE', f'admin/testimonials/{testimonial_id}', headers=headers)
            self.log_test("Delete testimonial", success, details)
    
    def test_admin_projects_management(self):
        """Test admin projects management"""
        if not self.admin_token:
            print("\n❌ Skipping admin projects tests - no admin token")
            return
            
        print("\n🏗️ Testing Admin Projects Management...")
        headers = {'Authorization': f'Bearer {self.admin_token}'}
        
        # Get all projects (admin view)
        success, data, details = self.make_request('GET', 'admin/projects', headers=headers)
        self.log_test("Admin get all projects", success, details)
        
        # Create a project
        project_data = {
            "title": "Test Infrastructure Project",
            "description": "A test project for infrastructure development in Romania.",
            "challenge": "Managing complex public procurement processes.",
            "solution": "Implemented comprehensive project management and consulting services.",
            "results": "Successfully completed on time and within budget.",
            "category": "Infrastructure",
            "year": "2024",
            "is_featured": True
        }
        
        success, data, details = self.make_request('POST', 'admin/projects', project_data, headers=headers)
        self.log_test("Create project", success, details)
        
        if success and 'id' in data:
            project_id = data['id']
            
            # Delete the project
            success, data, details = self.make_request('DELETE', f'admin/projects/{project_id}', headers=headers)
            self.log_test("Delete project", success, details)
    
    def test_unauthorized_access(self):
        """Test unauthorized access to admin endpoints"""
        print("\n🚫 Testing Unauthorized Access...")
        
        # Try to access admin endpoints without token
        endpoints = [
            'admin/blog',
            'admin/contacts', 
            'admin/testimonials',
            'admin/projects'
        ]
        
        for endpoint in endpoints:
            success, data, details = self.make_request('GET', endpoint, expected_status=403)
            self.log_test(f"Unauthorized access to {endpoint}", success, details)
    
    def run_all_tests(self):
        """Run all test suites"""
        print("🚀 Starting B-CON Consulting API Tests")
        print(f"Testing against: {self.base_url}")
        print("=" * 60)
        
        # Run test suites
        self.test_health_endpoints()
        self.test_contact_form()
        self.test_public_blog_endpoints()
        self.test_public_testimonials()
        self.test_public_projects()
        self.test_admin_auth()
        self.test_admin_blog_management()
        self.test_admin_contact_management()
        self.test_admin_testimonials_management()
        self.test_admin_projects_management()
        self.test_unauthorized_access()
        
        # Print summary
        print("\n" + "=" * 60)
        print(f"📊 Test Summary: {self.tests_passed}/{self.tests_run} tests passed")
        
        success_rate = (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0
        print(f"Success Rate: {success_rate:.1f}%")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return 0
        else:
            print("❌ Some tests failed. Check the details above.")
            return 1

def main():
    """Main test runner"""
    tester = BCONAPITester()
    return tester.run_all_tests()

if __name__ == "__main__":
    sys.exit(main())