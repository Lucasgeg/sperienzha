"use client";
import { RedirectToSignIn, SignIn, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const { userId } = useAuth();
  const router = useRouter();
  if (!userId) return <RedirectToSignIn />;
  return (
    <div>
      <div className="box1">
        <div className="box2">
          <div className="box3">
            <div className="one">Profil</div>
            <div
              className="two cursor-pointer"
              onClick={() => router.push("/tutor-research")}
            >
              Recherche de tuteur
            </div>
          </div>
          <div className="three">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            rutrum vehicula erat vel porttitor. Etiam commodo tellus eu
            ullamcorper viverra. Suspendisse potenti. Nulla eget libero rhoncus,
            hendrerit nisi eu, pretium ipsum. Aenean suscipit finibus egestas.
            Aliquam lorem elit, faucibus eget mollis nec, euismod et arcu.
            Pellentesque luctus porta enim. Phasellus cursus sem quam, non
            aliquet magna convallis quis.
            <br />
            <br />
            Maecenas eu dolor pretium, blandit erat nec, imperdiet quam. Integer
            lobortis venenatis nisl cursus dapibus. Duis ut ullamcorper arcu, id
            venenatis urna. Praesent dapibus semper purus, sit amet faucibus
            nisi accumsan vitae. Nunc dapibus sit amet elit aliquet elementum.
            Curabitur odio ligula, iaculis quis urna sit amet, lacinia
            condimentum tortor. Nunc ac hendrerit diam. Donec id venenatis leo.
            Fusce gravida diam risus, non cursus enim suscipit ut. Curabitur
            dignissim turpis a elit dictum, vitae tincidunt sapien elementum.
            Donec venenatis ipsum elit, et tincidunt orci feugiat sed.
          </div>
        </div>
        <div className="four flex justify-center items-center">Messagerie</div>
      </div>
    </div>
  );
}
