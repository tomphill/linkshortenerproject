import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SignUpButton } from "@clerk/nextjs";
import { Link2, BarChart3, Lock, Zap } from "lucide-react";

export default function Home() {
  // Note: Auth check would normally redirect authenticated users to dashboard
  // const { userId } = await auth();
  // if (userId) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-32">
        <div className="flex flex-col items-center text-center space-y-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl">
            Shorten Your Links,
            <span className="block text-primary"> Amplify Your Reach</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl">
            Create short, memorable links in seconds. Track analytics and manage all your URLs in one powerful dashboard.
          </p>
          <div className="flex gap-4 flex-col sm:flex-row">
            <SignUpButton mode="modal">
              <Button size="lg" className="text-lg px-8 py-6">
                Get Started Free
              </Button>
            </SignUpButton>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Powerful Features for Modern Links
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Everything you need to manage, track, and optimize your shortened links
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <Link2 className="w-10 h-10 text-primary mb-2" />
              <CardTitle className="text-white">Easy Link Shortening</CardTitle>
              <CardDescription>
                Create short, branded URLs instantly with our simple interface
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <BarChart3 className="w-10 h-10 text-primary mb-2" />
              <CardTitle className="text-white">Detailed Analytics</CardTitle>
              <CardDescription>
                Track clicks, locations, and referrers to understand your audience
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <Lock className="w-10 h-10 text-primary mb-2" />
              <CardTitle className="text-white">Secure & Private</CardTitle>
              <CardDescription>
                Your links are protected with enterprise-grade security
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <Zap className="w-10 h-10 text-primary mb-2" />
              <CardTitle className="text-white">Lightning Fast</CardTitle>
              <CardDescription>
                Instant redirects ensure the best experience for your users
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Get started in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <span className="text-3xl font-bold text-primary">1</span>
            </div>
            <h3 className="text-xl font-semibold text-white">Sign Up</h3>
            <p className="text-zinc-400">
              Create your free account in seconds with secure authentication
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <span className="text-3xl font-bold text-primary">2</span>
            </div>
            <h3 className="text-xl font-semibold text-white">Shorten</h3>
            <p className="text-zinc-400">
              Paste your long URL and get a short, memorable link instantly
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <span className="text-3xl font-bold text-primary">3</span>
            </div>
            <h3 className="text-xl font-semibold text-white">Share & Track</h3>
            <p className="text-zinc-400">
              Share your link and monitor its performance in real-time
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 pb-32">
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="flex flex-col items-center text-center space-y-6 py-16 px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to Transform Your Links?
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl">
              Join thousands of users who trust our platform for their link management needs
            </p>
            <SignUpButton mode="modal">
              <Button size="lg" className="text-lg px-8 py-6">
                Start Shortening Now
              </Button>
            </SignUpButton>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
