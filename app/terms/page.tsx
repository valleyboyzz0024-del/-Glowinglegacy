import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading text-gold mb-4">Terms of Service</h1>
          <p className="text-text-secondary">Last updated: October 31, 2024</p>
        </div>

        <Card className="border-gold/20 bg-background-card/60">
          <CardContent className="prose prose-invert max-w-none p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-heading text-gold mb-4">1. Acceptance of Terms</h2>
              <p className="text-text-secondary">
                By accessing and using Glowing Legacy (&quot;Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, please do not use our Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-gold mb-4">2. Service Description</h2>
              <p className="text-text-secondary">
                Glowing Legacy provides a platform for creating, storing, and scheduling delivery of video messages and legacy content. Our services include:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-2">
                <li>Video recording and storage capabilities</li>
                <li>Scheduled video message delivery</li>
                <li>Recipient management and organization</li>
                <li>E-commerce for legacy-related physical products</li>
                <li>Digital vault for storing important documents</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-gold mb-4">3. User Accounts</h2>
              <p className="text-text-secondary">
                To use certain features of our Service, you must create an account. You agree to:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Be responsible for all activities under your account</li>
                <li>Not share your account with others</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-gold mb-4">4. Content Ownership and License</h2>
              <p className="text-text-secondary">
                <strong className="text-gold">Your Content:</strong> You retain all rights to the videos and content you create (&quot;Your Content&quot;). You grant us a limited license to:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-2">
                <li>Store and process Your Content</li>
                <li>Deliver Your Content to designated recipients</li>
                <li>Create backups and ensure service reliability</li>
                <li>Display Your Content to you within the Service</li>
              </ul>
              <p className="text-text-secondary mt-4">
                We will never sell, share, or use Your Content for any purpose other than providing our Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-gold mb-4">5. Acceptable Use</h2>
              <p className="text-text-secondary">You agree NOT to:</p>
              <ul className="list-disc pl-6 text-text-secondary space-y-2">
                <li>Upload illegal, harmful, or offensive content</li>
                <li>Violate any laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Harass, threaten, or harm others</li>
                <li>Spam or send unsolicited communications</li>
                <li>Attempt to breach our security measures</li>
                <li>Use the Service for commercial purposes without permission</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-gold mb-4">6. Payment and Subscriptions</h2>
              <p className="text-text-secondary">
                <strong className="text-gold">Pricing:</strong> Subscription and service fees are listed on our pricing page. Prices may change with notice.
              </p>
              <p className="text-text-secondary mt-3">
                <strong className="text-gold">Billing:</strong> By providing payment information, you authorize us to charge your payment method for applicable fees.
              </p>
              <p className="text-text-secondary mt-3">
                <strong className="text-gold">Refunds:</strong> Refund policies are available on request. Contact <a href="mailto:billing@glowinglegacy.com" className="text-gold hover:underline">billing@glowinglegacy.com</a> for refund inquiries.
              </p>
              <p className="text-text-secondary mt-3">
                <strong className="text-gold">Cancellation:</strong> You may cancel your subscription at any time. Access continues until the end of your billing period.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-gold mb-4">7. Video Delivery</h2>
              <p className="text-text-secondary">
                We will make reasonable efforts to deliver your videos on scheduled dates. However:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-2">
                <li>Delivery is subject to recipient contact information accuracy</li>
                <li>Technical issues may cause delays</li>
                <li>You are responsible for verifying recipient information</li>
                <li>We cannot guarantee delivery if recipients block or refuse communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-gold mb-4">8. Data Backup and Storage</h2>
              <p className="text-text-secondary">
                While we maintain regular backups, you should:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-2">
                <li>Keep personal copies of important videos</li>
                <li>Regularly verify your content</li>
                <li>Understand that no storage solution is 100% failsafe</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-gold mb-4">9. Termination</h2>
              <p className="text-text-secondary">
                We may suspend or terminate your account if you:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-2">
                <li>Violate these Terms</li>
                <li>Engage in fraudulent activity</li>
                <li>Fail to pay applicable fees</li>
                <li>Upload prohibited content</li>
              </ul>
              <p className="text-text-secondary mt-3">
                Upon termination, you may request a download of Your Content within 30 days.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-gold mb-4">10. Disclaimers and Limitations</h2>
              <p className="text-text-secondary">
                <strong className="text-gold">Service &quot;As Is&quot;:</strong> The Service is provided &quot;as is&quot; without warranties of any kind.
              </p>
              <p className="text-text-secondary mt-3">
                <strong className="text-gold">No Liability:</strong> We are not liable for indirect, incidental, or consequential damages arising from your use of the Service.
              </p>
              <p className="text-text-secondary mt-3">
                <strong className="text-gold">Limitation:</strong> Our total liability shall not exceed the amount you paid us in the 12 months preceding the claim.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-gold mb-4">11. Indemnification</h2>
              <p className="text-text-secondary">
                You agree to indemnify and hold harmless Glowing Legacy from any claims arising from:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-2">
                <li>Your use of the Service</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any rights of another party</li>
                <li>Content you upload or share</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-gold mb-4">12. Changes to Terms</h2>
              <p className="text-text-secondary">
                We may modify these Terms at any time. We will notify you of material changes via email or Service notification. Continued use after changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-gold mb-4">13. Governing Law</h2>
              <p className="text-text-secondary">
                These Terms are governed by the laws of the United States. Any disputes shall be resolved in the courts of [Your Jurisdiction].
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-gold mb-4">14. Contact Information</h2>
              <p className="text-text-secondary">
                For questions about these Terms, please contact us:
              </p>
              <ul className="list-none pl-0 text-text-secondary space-y-2 mt-4">
                <li><strong className="text-gold">General:</strong> <a href="mailto:info@glowinglegacy.com" className="text-gold hover:underline">info@glowinglegacy.com</a></li>
                <li><strong className="text-gold">Support:</strong> <a href="mailto:support@glowinglegacy.com" className="text-gold hover:underline">support@glowinglegacy.com</a></li>
                <li><strong className="text-gold">Legal:</strong> <a href="mailto:admin@glowinglegacy.com" className="text-gold hover:underline">admin@glowinglegacy.com</a></li>
              </ul>
            </section>

            <div className="border-t border-gold/20 pt-6 mt-8">
              <p className="text-sm text-text-secondary text-center">
                By using Glowing Legacy, you agree to these Terms of Service and our{' '}
                <Link href="/privacy" className="text-gold hover:underline">Privacy Policy</Link>.
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