"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function AboutUs() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/membership/team/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setTeamMembers(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch team members.");
        }
      } catch (error) {
        toast.error(
          error.message || "An error occurred while fetching team members."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <main className="">
      <section className="relative h-[60vh] text-white flex items-center justify-center px-6">
        <div className="absolute inset-0">
          <Image
            src="/images/about-hero.jpg"
            alt="Gym"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-5xl">
          <motion.h1
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About <span className="text-tertiary-dark">Us</span>
          </motion.h1>
          <motion.p
            className="text-sm md:text-lg text-gray-300"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Our mission is to help you achieve your fitness goals through expert
            guidance and world-class facilities. Founded in 2010, our gym
            started with a simple mission: to create a supportive and empowering
            fitness environment. Today, we are proud to be one of the top
            fitness destinations in the city.
          </motion.p>
        </div>
        <div className="absolute inset-0 bg-black/80"></div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: -50 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            ref={ref}
          >
            Our Values & Mission
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Card className="bg-slate-200 text-tertiary-dark shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl">Commitment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-900">
                    We are dedicated to helping you stay consistent and reach
                    your fitness goals.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Card className="bg-slate-200 text-tertiary-dark shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl">Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-900">
                    We believe in fostering a friendly, welcoming, and
                    motivating atmosphere.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Card className="bg-slate-200 text-tertiary-dark shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl">Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-900">
                    We focus on delivering real, sustainable results for all our
                    members.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10">Meet the Team</h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 2 }).map((_, index) => (
              <Card
                key={index}
                className="bg-white shadow-md max-w-[400px] w-full mx-auto"
              >
                <div className="relative w-full h-60 rounded-t-lg overflow-hidden">
                  <Skeleton className="w-full h-full" />
                </div>
                <CardHeader className="text-center">
                  <Skeleton className="h-8 w-3/4 mx-auto" />
                  <Skeleton className="h-6 w-1/2 mx-auto mt-2" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teamMembers.map((member, index) => (
              <div key={index}>
                <Card className="bg-white shadow-md max-w-[400px] w-full mx-auto">
                  <div className="relative w-full h-60 rounded-t-lg overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover img scale-animation"
                    />
                  </div>
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl text-primary">
                      {member.name}
                    </CardTitle>
                    <p className="text-gray-500">{member.position}</p>
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="bg-slate-200 py-16 px-6 text-center">
        <motion.h2
          className="text-4xl font-bold text-gray-900 mb-4"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: -50 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
        >
          Ready to Join Us?
        </motion.h2>
        <motion.p
          className="text-lg text-gray-800 mb-6"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: -50 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Become part of our fitness family and start your transformation today.
        </motion.p>
        <Link href="/membership-plan">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: -50 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Button className="bg-gray-900 hover:bg-gray-700 text-white px-6 py-3 text-lg">
              Join Now
            </Button>
          </motion.div>
        </Link>
      </section>
    </main>
  );
}
