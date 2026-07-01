import { createBrowserRouter, redirect } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { GenericPage } from "./pages/GenericPage";
import { AffiliationsSubPage } from "./pages/AffiliationsSubPage";
import { SubmissionsPage } from "./pages/SubmissionsPage";
import { AccountPage } from "./pages/AccountPage";
import { LocationPage } from "./pages/LocationPage";
import { BranchesPage } from "./pages/BranchesPage";
import { BranchFormPage } from "./pages/BranchFormPage";
import { DocumentsPage } from "./pages/DocumentsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { CertificationsPage } from "./pages/CertificationsPage";
import { ShoppingCartPage } from "./pages/ShoppingCartPage";
import { InvoicesPage } from "./pages/InvoicesPage";
import { MyAssetsPage } from "./pages/MyAssetsPage";
import { AssetInstancePage } from "./pages/AssetInstancePage";
import { AssetCertificationsPage } from "./pages/AssetCertificationsPage";
import { CorrespondencePage } from "./pages/CorrespondencePage";
import { PacketsPage } from "./pages/PacketsPage";
import { CreatePacketPage } from "./pages/CreatePacketPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      {
        path: "account",
        Component: AccountPage,
      },
      {
        path: "account/branches",
        Component: BranchesPage,
      },
      {
        path: "account/branches/add",
        Component: () => BranchFormPage({ mode: "add" }),
      },
      {
        path: "account/branches/:id/view",
        Component: () => BranchFormPage({ mode: "view" }),
      },
      {
        path: "account/branches/:id/edit",
        Component: () => BranchFormPage({ mode: "edit" }),
      },
      {
        path: "account/contacts",
        Component: () => GenericPage({ title: "Contacts" }),
      },
      {
        path: "account/location",
        Component: LocationPage,
      },
      {
        path: "account/profile",
        Component: ProfilePage,
      },
      {
        path: "affiliations",
        loader: () => redirect("/affiliations/subordinate"),
      },
      {
        path: "affiliations/subordinate",
        Component: () => AffiliationsSubPage({ subTitle: "Subordinate" }),
      },
      {
        path: "affiliations/superior",
        Component: () => AffiliationsSubPage({ subTitle: "Superior" }),
      },
      {
        path: "affiliations/pending",
        Component: () => AffiliationsSubPage({ subTitle: "Pending" }),
      },
      {
        path: "affiliations/renewals",
        Component: () => AffiliationsSubPage({ subTitle: "Renewals" }),
      },
      {
        path: "affiliations/history",
        Component: () => AffiliationsSubPage({ subTitle: "History" }),
      },
      {
        path: "certifications",
        Component: CertificationsPage,
      },
      {
        path: "complaints",
        Component: () => GenericPage({ title: "Complaints" }),
      },
      {
        path: "correspondence",
        loader: () => redirect("/correspondence/emails"),
      },
      {
        path: "correspondence/emails",
        Component: () => CorrespondencePage({ activeTab: "emails" }),
      },
      {
        path: "correspondence/letters",
        Component: () => CorrespondencePage({ activeTab: "letters" }),
      },
      {
        path: "documents",
        Component: DocumentsPage,
      },
      {
        path: "invoices",
        Component: InvoicesPage,
      },
      {
        path: "packets",
        Component: PacketsPage,
      },
      {
        path: "packets/create",
        Component: CreatePacketPage,
      },
      {
        path: "shopping-cart",
        loader: () => redirect("/shopping-cart/cart"),
      },
      {
        path: "shopping-cart/cart",
        Component: () => ShoppingCartPage({ activeTab: "cart" }),
      },
      {
        path: "shopping-cart/payment-summary",
        Component: () => ShoppingCartPage({ activeTab: "payment-summary" }),
      },
      {
        path: "submissions",
        loader: () => redirect("/submissions/my-submissions"),
      },
      {
        path: "submissions/my-submissions",
        Component: () => SubmissionsPage({ activeTab: "my-submissions" }),
      },
      {
        path: "submissions/payment-requests",
        Component: () => SubmissionsPage({ activeTab: "payment-requests" }),
      },
      {
        path: "asset-certifications",
        loader: () => redirect("/asset-certifications/my-certifications"),
      },
      {
        path: "asset-certifications/my-certifications",
        Component: () => AssetCertificationsPage({ activeTab: "my-certifications" }),
      },
      {
        path: "asset-certifications/sponsored-certifications",
        Component: () => AssetCertificationsPage({ activeTab: "sponsored-certifications" }),
      },
      {
        path: "my-assets",
        Component: MyAssetsPage,
      },
      {
        path: "my-assets/:id",
        Component: AssetInstancePage,
      },
      {
        path: "asset-submissions",
        Component: () => GenericPage({ title: "Submissions" }),
      },
      {
        path: "renewals",
        Component: () => GenericPage({ title: "Renewals" }),
      },
    ],
  },
], {
  basename: import.meta.env.BASE_URL,
});