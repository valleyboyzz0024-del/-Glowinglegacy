import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading text-gold mb-4">Privacy Policy</h1>
          <p className="text-text-secondary">Last updated: October 31, 2024</p>
        </div>

        <Card className="border-gold/20 bg-background-card/60">
          <CardContent className="prose prose-invert max-w-none p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-heading text-gold mb-4">1. Information We Collect</h2>
              <p className="text-text-secondary">
                At Glowing Legacy, we collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-2">
                <li>Name, email address, and phone number</li>
                <li>Video recordings and messages you create</li>
                <li>Recipient information for video delivery</li>
                <li>Payment and billing information</li>
                <li>Communications with our support team</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-gold mb-4">2. How We Use Your Information</h2>
              <p className="text-text-secondary">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process and deliver video messages to recipients</li>
                <li>Send you technical notices and support messages</li>
                <li>Process payments and prevent fraud</li>
                <li>Respond to your comments and questions</li>
                <li>Send you marketing communications (with your consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-gold mb-4">3. Data Storage and Security</h2>
              <p className="text-text-secondary">
                Your videos and personal information are stored securely using industry-standard encryption. We use:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-2">
                <li>256-bit SSL/TLS encryption for data in transit</li>
                <li>AES-256 encryption for data at rest</li>
                <li>Secure cloud storage with multiple redundancy</li>
                <li>Regular security audits and monitoring</li>
                <li>Strict access controls and authentication</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-gold mb-4">4. Video Privacy</h2>
              <p className="text-text-secondary">
                Your video messages are private and secure:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-2">
                <li>Only you and designated recipients can access your videos</li>
                <li>Videos are not publicly viewable or searchable</li>
                <li>We never sell or share your videos with third parties</li>
                <li>You maintain full ownership of your content</li>
                <li>You can delete your videos at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-gold mb-4">5. Sharing Information</h2>
              <p className="text-text-secondary">
                We do not sell your personal information. We may share your information only:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-2">
                <li>With your explicit consent</li>
                <li>With service providers who assist our operations</li>
                <li>To comply with legal obligations</li>
                <li>To protect rights, property, or safety</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-gold mb-4">6. Your Rights</h2>
              <p className="text-text-secondary">You have the right to:</p>
              <ul className="list-disc pl-6 text-text-secondary space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Export your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-gold mb-4">7. Data Retention</h2>
              <p className="text-text-secondary">
                We retain your information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. Videos are stored according to your selected plan duration. You can request deletion at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-gold mb-4">8. Children&apos;s Privacy</h2>
              <p className="text-text-secondary">
                Our service is not directed to children under 13. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-gold mb-4">9. International Users</h2>
              <p className="text-text-secondary">
                If you are accessing our service from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States where our servers are located.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-gold mb-4">10. Changes to This Policy</h2>
              <p className="text-text-secondary">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-gold mb-4">11. Contact Us</h2>
              <p className="text-text-secondary">
                If you have questions about this Privacy Policy, please contact us:
              </p>
              <ul className="list-none pl-0 text-text-secondary space-y-2 mt-4">
                <li><strong className="text-gold">Email:</strong> <a href="mailto:privacy@glowinglegacy.com" className="text-gold hover:underline">privacy@glowinglegacy.com</a></li>
                <li><strong className="text-gold">Support:</strong> <a href="mailto:support@glowinglegacy.com" className="text-gold hover:underline">support@glowinglegacy.com</a></li>
              </ul>
            </section>

            <div className="border-t border-gold/20 pt-6 mt-8">
              <p className="text-sm text-text-secondary text-center">
                By using Glowing Legacy, you agree to this Privacy Policy and our{' '}
                <Link href="/terms" className="text-gold hover:underline">Terms of Service</Link>.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Link href="/" className="text-gold hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}