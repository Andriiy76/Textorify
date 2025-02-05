import React from "react";
import { motion } from "framer-motion";

const TermsOfService = () => {
  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Terms of Service</h1>

      <p>
        These Terms of Service ("Terms") govern your use of the Textorify website and services (the "Service"). By using the Service, you agree to be bound by these Terms.
      </p>

      <h2>Account Creation</h2>
      <p>
        To use the Service, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
      </p>

      <h2>Use of the Service</h2>
      <p>
        You may use the Service only for lawful purposes and in accordance with these Terms. You agree not to use the Service:
      </p>
      <ul>
        <li>In any way that violates any applicable law or regulation.</li>
        <li>To generate content that is infringing, obscene, defamatory, or otherwise objectionable.</li>
        <li>To impersonate any person or entity.</li>
        <li>To interfere with or disrupt the Service.</li>
        <li>To attempt to gain unauthorized access to the Service.</li>
      </ul>

      <h2>Intellectual Property</h2>
      <p>
        The Service and its original content, features, and functionality are owned by Textorify and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
      </p>

      <h2>Disclaimer of Warranties</h2>
      <p>
        THE SERVICE IS PROVIDED "AS IS" AND WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TEXTORIFY DISCLAIMS ALL WARRANTIES, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        IN NO EVENT SHALL TEXTORIFY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING, BUT NOT LIMITED TO, LOSS OF PROFITS, DATA, OR USE, ARISING OUT OF OR IN CONNECTION WITH THE SERVICE, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, EVEN IF TEXTORIFY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
      </p>

      <h2>Indemnification</h2>
      <p>
        You agree to indemnify and hold harmless Textorify and its officers, directors, employees, and agents from and against any and all claims, liabilities, damages, losses, or expenses, including reasonable attorneys' fees and costs, arising out of or in any way connected with your access to or use of the Service.
      </p>

      <h2>Governing Law</h2>
      <p>
        These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
      </p>

      <h2>Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. We will notify you of any changes by posting the new Terms on the Service.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions about these Terms, please contact us at <a href="mailto:support@textorify.com">support@textorify.com</a>.
      </p>
    </motion.div>
  );
};

export default TermsOfService;